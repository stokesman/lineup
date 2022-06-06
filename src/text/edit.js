import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

import './editor.scss';
import metadata from './block.json';

export default function Edit( {
	attributes,
	clientId,
	mergeBlocks,
	onRemove,
	onReplace,
	setAttributes,
} ) {
	const { content, placeholder } = attributes;
	return (
		<RichText
			identifier="content"
			tagName="span"
			{ ...useBlockProps() }
			value={ content }
			onChange={ ( newContent ) =>
				setAttributes( { content: newContent } )
			}
			onSplit={ ( value, isOriginal ) => {
				let newAttributes;

				if ( isOriginal || value ) {
					newAttributes = {
						...attributes,
						content: value,
					};
				}

				const block = createBlock( metadata.name, newAttributes );

				if ( isOriginal ) {
					block.clientId = clientId;
				}

				return block;
			} }
			onMerge={ mergeBlocks }
			onReplace={ onReplace }
			onRemove={ onRemove }
			aria-label={
				content
					? __( 'Text block' )
					: __(
							'Empty block; start writing or type forward slash to choose a block'
					  )
			}
			placeholder={ placeholder ?? __( 'Type / to choose a block' ) }
		/>
	);
}
