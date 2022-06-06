/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

import { isElement, getTagName } from './edit';

export default function save( { attributes: { content } } ) {
	if ( isElement( content ) ) {
		const TagName = getTagName( content );
		content = <TagName />;
	}
	return <span { ...useBlockProps.save( { children: content } ) } />;
}
