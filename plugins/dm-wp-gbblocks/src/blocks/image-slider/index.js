const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {Spinner} = wp.components;
const {withSelect} = wp.data;
import PostItem from '../../components/common/PostItem';

export default registerBlockType(
	'dm-wp-gbblocks/sticky-posts',
	{
		title: __('Sticky Posts', 'dm-wp-gbblocks'),
		description: __('Sticky Posts', 'dm-wp-gbblocks'),
		category: 'widgets',
		icon: 'excerpt-view',
		keywords: [
			__('Sticky Posts', 'dm-wp-gbblocks')
		],

		/**
		 * output and behaviour in editor
		 * @param props
		 * @returns {*}
		 */
		edit: withSelect(select => {
			return {
				posts: select('core').getEntityRecords('postType', 'post', {per_page: 10})
			};
		})(({posts, className}) => {
			if (!posts) {
				return (
					<p className={className}>
						<Spinner/>
						{__('Loading Posts', 'dm-wp-gbblocks')}
					</p>
				);
			}
			if (0 === posts.length) {
				return <p>{__('No Posts Found', 'dm-wp-gbblocks')}</p>;
			}
			return (
				<div className={className}>
					<ul>
						{posts.map(post => {
							return (
								<PostItem post={post}/>
							);
						})}
					</ul>
				</div>
			);
		}),

		/**
		 * output in frontend
		 */
		save: () => null,
	},
);
