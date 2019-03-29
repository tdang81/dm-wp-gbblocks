const {Component} = wp.element;
const {Spinner} = wp.components;

export default class PostItem extends Component {
	state = {
		imageUrl: '',
		isLoading: false
	};

	componentDidMount() {
		const post = this.props.post;

		if (!post.featured_media) {
			return;
		}

		const imageAPIEndpoint = post._links['wp:featuredmedia']['0'].href || null;

		this.setState({
			isLoading: true
		});

		//fetch post featured image
		fetch(imageAPIEndpoint)
			.then(response => response.json())
			.then((data) => {
				this.setState(
					{
						imageUrl: data.media_details.sizes.medium.source_url,
						isLoading: false
					}
				);
			});
	}

	/**
	 *
	 * @returns {*}
	 */
	render() {
		return (
			<li>
				<a className={this.props.className} href={this.props.post.link}>
					{this.props.post.title.rendered}
					{this.state.imageUrl ? <img src={this.state.imageUrl}/> : null}
				</a>
				{this.state.isLoading ? <Spinner/> : null}
			</li>
		);
	}
}
