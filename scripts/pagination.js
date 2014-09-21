/** @jsx React.DOM */

var PaginationBoxView = React.createClass({
    getInitialState: function() {
        return {selected: 0};
    },
    handlePageSelected: function(index) {
        this.setState({selected: index});
    },
    handlePreviousPage: function() {
        if (this.state.selected > 0) {
            this.handlePageSelected(this.state.selected - 1);
        }
    },
    handleNextPage: function() {
        if (this.state.selected < this.props.pageNum - 1) {
            this.handlePageSelected(this.state.selected + 1);
        }
    },
    render: function() {
        return (
            <div className="pagination">
                <li onClick={this.handlePreviousPage}>
                    {this.props.previousLabel}
                </li>

                <PaginationListView
                    onPageSelected={this.handlePageSelected}
                    selected={this.state.selected}
                    pageNum={this.props.pageNum}
                    pageRangeDisplayed={this.props.pageRangeDisplayed}
                    marginPagesDisplayed={this.props.marginPagesDisplayed} />

                <li onClick={this.handleNextPage}>
                    {this.props.nextLabel}
                </li>
            </div>
        );
    }
});

var PaginationListView = React.createClass({
    render: function() {
        if (this.props.pageNum <= this.props.pageRangeDisplayed) {
            var items = _.range(1, this.props.pageNum + 1).map(function(page, index) {
                return (
                    <PageView
                        onClick={this.props.onPageSelected.bind(null, index)}
                        selected={this.props.selected === index}
                        key={index}>
                        {page}
                    </PageView>
                )
            }.bind(this));
        } else {
            var leftSide = (this.props.pageRangeDisplayed/2);
            var rightSide = (this.props.pageRangeDisplayed - leftSide);

            if (this.props.selected > this.props.pageNum - this.props.pageRangeDisplayed/2) {
                rightSide = this.props.pageNum - this.props.selected;
                leftSide = this.props.pageRangeDisplayed - rightSide;
            }
            else if (this.props.selected < this.props.pageRangeDisplayed/2) {
                leftSide = this.props.selected;
                rightSide = this.props.pageRangeDisplayed - leftSide;
            }

            var items = []

            _.range(1, this.props.pageNum + 1).map(function(page, index) {
                var pageView = (
                    <PageView
                        onClick={this.props.onPageSelected.bind(null, index)}
                        selected={this.props.selected === index}
                        key={index}>
                        {page}
                        </PageView>
                );

                if (page <= this.props.pageRangeDisplayed) {
                    items.push(pageView);
                }
                else if (page > this.props.pageNum - this.props.marginPagesDisplayed) {
                    items.push(pageView);
                }
                else if ((page >= this.props.selected - leftSide) && (page <= this.props.selected + rightSide)) {
                    items.push(pageView);
                }
                else if (items[-1]) {
                    items.push(null);
                }
            }.bind(this));
        }

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
        return this.transferPropsTo(
            <li className={cssClass}>
                {this.props.children}
            </li>
        );
    }
});

var PAGE_NUM = 10;
var MARGIN_PAGES_DISPLAYED = 2;
var PAGE_RANGE_DISPLAYED = 3;
var PREVIOUS_LABEL = "Previous"
var NEXT_LABEL = "Next"

React.renderComponent(
    <PaginationBoxView
        pageNum={PAGE_NUM}
        pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
        marginPagesDisplayed={MARGIN_PAGES_DISPLAYED}
        previousLabel={PREVIOUS_LABEL}
        nextLabel={NEXT_LABEL} />,
    document.getElementById('react-pagination')
);
