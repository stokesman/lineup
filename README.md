# Lineup block & inline blocks

This is an example WordPress plugin intended as a starting place to explore development of “inline” blocks. It's really no different than regular block development. The likely obstacle is most core blocks where one might want to place inline inner blocks (e.g. Paragraphs, Headings, Buttons) do not take them. So you end up needing to roll your own version of core blocks to accommodate inner blocks.

In the case of this plugin the Lineup block is the generic container block to accept inline blocks. By default it will render a paragraph but the element can be changed in the “Advanced” panel in the block settings. The selection of elements is very limited but it’s light work to expand the selection to suit your needs. The block also only allows a limited set of inner blocks (the ones included with the plugin).

The additional blocks included as examples are Text, Special and IP.
- Text renders a span element but is otherwise much like the core paragraph block.
- Special provides a selection of special characters or elements for insertion and also renders a span element.
- IP outputs the visitor’s IP address and is a dynamic block rendered as a span element.

## Development

Examples here use [pnpm](https://pnpm.io/). Of course, any Node.js package manager will do.

Install:
`pnpm install`

Run the development process to rebuild as you save your work:
`pnpm start`

Produce a production build:
`pnpm build`

Package a zip for distribution:
`pnpm plugin-zip`

For more information on the scripts used to develop this see:
https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/
