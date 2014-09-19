/** @jsx React.DOM */

var PAGE_NUM = 10;

var PaginationBoxView = React.createClass({
    getInitialState: function() {
        return {selected: 0};
    },
    handlePageSelected: function(index) {
        this.setState({selected: index});
    },
    handlePreviousPage: function() {
        if (this.state.selected - 1 > 0) {
            this.handlePageSelected(this.state.selected - 1);
        }
    },
    handleNextPage: function() {
        if (this.state.selected < this.props.page_num - 1) {
            this.handlePageSelected(this.state.selected + 1);
        }
    },
    render: function() {
        return (
            <div className="pagination">
                <li onClick={this.handlePreviousPage}>
                    Previous
                </li>

                <PaginationListView
                    onPageSelected={this.handlePageSelected}
                    selected={this.state.selected}
                    page_num={this.props.page_num} />

                <li onClick={this.handleNextPage}>
                    Next
                </li>
            </div>
        );
    }
});

var PaginationListView = React.createClass({
    render: function() {
        var items = _.range(1, this.props.page_num + 1).map(function(page, index) {
            return (
                <PageView
                    onClick={this.props.onPageSelected.bind(null, index)}
                    selected={this.props.selected === index}
                    key={index}>
                    {page}
                </PageView>
            )
        }.bind(this));

        return (
            <ul className="pages">
                {items}
            </ul>
        );
    }
});

var PageView = React.createClass({
    render: function() {
        if (this.props.selected) {
            var cssClass = 'selected';
        }
        return (
            <li className={cssClass}>
                {this.props.children}
            </li>
        );
    }
});

React.renderComponent(
    <PaginationBoxView page_num={PAGE_NUM} />,
    document.getElementById('pagination')
);