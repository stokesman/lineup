import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useRef } from '@wordpress/element';

const htmlElementMessages = {
	p: __( 'The <p> element represents a paragraph.' ),
	div: __( 'The <div> element is a generic wrapping element.' ),
	blockquote: __( 'The <blockquote> element represents a quoted passage.' ),
};

export default function Edit( { attributes, clientId, setAttributes } ) {
	const {
		hasInnerBlocks,
		getBlock,
		getBlockIndex,
		getSelectedBlockClientId,
	} = useSelect(
		( select ) => {
			const {
				getBlock,
				getBlockIndex,
				getSelectedBlockClientId,
			} = select( blockEditorStore );
			return {
				hasInnerBlocks: getBlock( clientId ).innerBlocks.length > 0,
				getBlock,
				getBlockIndex,
				getSelectedBlockClientId,
			};
		},
		[ clientId ]
	);
	const { insertBlock } = useDispatch( blockEditorStore );
	const refBlock = useRef();
	const onKeyDown = ( { key, target } ) => {
		if ( key === 'Enter' && refBlock.current.contains( target ) ) {
			const selectedClientId = getSelectedBlockClientId();
			const block = getBlock( selectedClientId );
			// Bails on s8/text blocks to let them handle enter.
			if ( block.name === 's8/text' ) return;

			const newText = createBlock( 's8/text' );
			const newIndex = 1 + getBlockIndex( selectedClientId );
			insertBlock( newText, newIndex, clientId, true );
		}
	};
	const blockProps = useInnerBlocksProps(
		{ ...useBlockProps( { ref: refBlock, onKeyDown } ) },
		{
			template: [ [ 's8/text' ] ],
			templateInsertUpdatesSelection: true,
			allowedBlocks: [ 's8/ip', 's8/special', 's8/text' ],
			orientation: 'horizontal',
		}
	);
	const TagName = attributes.tagName;
	return (
		<>
			<InspectorControls __experimentalGroup="advanced">
				<SelectControl
					label={ __( 'HTML element' ) }
					options={ [
						{ label: __( 'Default (<p>)' ), value: 'p' },
						{ label: '<div>', value: 'div' },
						{ label: '<blockquote>', value: 'blockquote' },
					] }
					value={ TagName }
					onChange={ ( value ) =>
						setAttributes( { tagName: value } )
					}
					help={ htmlElementMessages[ TagName ] }
				/>
			</InspectorControls>
			<div { ...blockProps } />
		</>
	);
}
