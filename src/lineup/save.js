import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes: { tagName: TagName } } ) {
	return <TagName { ...useInnerBlocksProps.save( useBlockProps.save() ) } />;
}
