/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module html-embed/htmlembedupdatecommand
 */

import Command from '@ckeditor/ckeditor5-core/src/command';

/**
 * The update raw html value command.
 *
 * The command is registered by {@link module:html-embed/htmlembedediting~HtmlEmbedEditing} as `'htmlEmbedUpdate'`.
 *
 * To update the value of the raw html element at the current selection, execute the command:
 *
 *		editor.execute( 'htmlEmbedUpdate', '<b>HTML.</b>' );
 *
 * @extends module:core/command~Command
 */
export default class HtmlEmbedUpdateCommand extends Command {
	/**
	 * @inheritDoc
	 */
	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const rawHtmlElement = getSelectedRawHtmlModelWidget( selection );

		this.isEnabled = !!rawHtmlElement;
	}

	/**
	 * Executes the command, which updates the `value` attribute of the embedded HTML element:
	 *
	 * @fires execute
	 * @param {String} value HTML as a string.
	 */
	execute( value ) {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedRawHtmlElement = getSelectedRawHtmlModelWidget( selection );

		if ( selectedRawHtmlElement ) {
			model.change( writer => {
				writer.setAttribute( 'value', value, selectedRawHtmlElement );
			} );
		}
	}
}

// Returns a selected raw html element in the model, if any.
//
// @param {module:engine/model/selection~Selection} selection
// @returns {module:engine/model/element~Element|null}
function getSelectedRawHtmlModelWidget( selection ) {
	const selectedElement = selection.getSelectedElement();

	if ( selectedElement && selectedElement.is( 'element', 'rawHtml' ) ) {
		return selectedElement;
	}

	return null;
}