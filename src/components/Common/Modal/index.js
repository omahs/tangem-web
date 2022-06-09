import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as styles from './modal.module.scss';
import ClientOnlyPortal from "../ClientOnlyPortal";

function Modal({ isShowing, hide, children, title }) {
	/* eslint-env browser */

	const [node, setRef] = useState(null);

	useEffect(() => {
		if (!node) {
			return function empty() {
				//
			};
		}
		const focusedElementBeforeModal = document.activeElement;
		const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
		const focusableElementsValues = node.querySelectorAll(focusableElementsString);
		const elements = Array.prototype.slice.call(focusableElementsValues);
		const firstTabStop = elements.length ? elements[0] : focusedElementBeforeModal;
		const lastTabStop = elements.length ? elements[elements.length - 1] : focusedElementBeforeModal;
		firstTabStop.focus();

		function trapTabKey(e) {
			// Check for TAB key press
			if (e.keyCode === 9) {
				// SHIFT + TAB
				if (e.shiftKey) {
					if (document.activeElement === firstTabStop) {
						e.preventDefault();
						lastTabStop.focus();
					}

					// TAB
				} else if (document.activeElement === lastTabStop) {
					e.preventDefault();
					firstTabStop.focus();
				}
			}

			// ESCAPE
			if (e.keyCode === 27) {
				hide();
			}
		}

		node.addEventListener('keydown', trapTabKey);

		return function returnFocus() {
			node.removeEventListener('keydown', trapTabKey);
			focusedElementBeforeModal.focus();
		};
	}, [node, hide]);

	return isShowing ?  (
		<ClientOnlyPortal selector="#portal">
			<div className={styles.overlay}>
				<div ref={setRef} className={styles.wrapper} aria-modal aria-hidden tabIndex={-1} role="dialog">
					{ title && <h2 className={styles.title}>{ title }</h2>}
					<div className={styles.modal}>
						{ children }
					</div>
					<button type="button" className={styles.close} onClick={hide}>
						<img alt="close" src="/svg/close.svg" />
					</button>
				</div>
			</div>
		</ClientOnlyPortal>
		) : null;
}

Modal.propTypes = {
	isShowing: PropTypes.bool.isRequired,
	hide: PropTypes.func.isRequired,
	title: PropTypes.string,
};

export default Modal;