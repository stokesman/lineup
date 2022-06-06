import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import {
	DropdownMenu,
	ToolbarItem,
	MenuItemsChoice,
} from '@wordpress/components';

import './editor.scss';

const choices = [
	{ label: 'Club', value: '♣' },
	{ label: 'Diamond', value: '♦' },
	{ label: 'Heart', value: '♥' },
	{ label: 'Spade', value: '♠' },
	{ label: 'Break opportunity', value: '<wbr>', preview: '⌁' },
	{ label: 'No-break Space', value: '&nbsp;', preview: '≁' },
];

export const isElement = ( content ) => /^<.+>$/.test( content );
export const getTagName = ( content ) => content.match( /^<(\w+)\/?>/ )[ 1 ];

export default function Edit( { attributes, setAttributes } ) {
	const { content } = attributes;
	const chosen = choices.find( ( item ) => item.value === content ) ?? {
		value: '¿',
	};
	const preview = chosen.preview ?? chosen.value;
	const TagName = isElement( content ) ? getTagName( content ) : null;
	return (
		<>
			<BlockControls>
				<ToolbarItem>
					{ ( toolbarItemProps ) => (
						<DropdownMenu
							label="Choose insertion"
							toggleProps={ toolbarItemProps }
						>
							{ ( { onClose } ) => (
								<MenuItemsChoice
									choices={ choices }
									value={ content }
									onSelect={ ( v ) => {
										setAttributes( { content: v } );
										onClose();
									} }
								/>
							) }
						</DropdownMenu>
					) }
				</ToolbarItem>
			</BlockControls>
			<span { ...useBlockProps( { 'data-special': preview } ) }>
				{ preview }
				{ TagName && <TagName /> }
			</span>
		</>
	);
}
