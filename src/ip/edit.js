import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit() {
	return <span { ...useBlockProps() }>{ window[ 's8/' ].ip }</span>;
}
