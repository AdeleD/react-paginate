/** @jsx React.DOM */

var PaginationBoxView = React.createClass({
    getDefaultProps: function() {
        return {
            pageNum: 10,
            pageRangeDisplayed: 2,
            marginPagesDisplayed: 3,
            previousLabel: "Previous",
            nextLabel: "Next",
            breakLabel: "..."
        };
    },
    getInitialState: function() {
        return {selected: 0};
    },
    handlePageSelected: function(index) {
        this.setState({selected: index});
        return false;
    },
    handlePreviousPage: function() {
        if (this.state.selected > 0) {
            this.handlePageSelected(this.state.selected - 1);
        }
        return false;
    },
    handleNextPage: function() {
        if (this.state.selected < this.props.pageNum - 1) {
            this.handlePageSelected(this.state.selected + 1);
        }
        return false;
    },
    render: function() {
        return (
            <div className="pagination">
                <li onClick={this.handlePreviousPage}>
                    <a href="">{this.props.previousLabel}</a>
                </li>

                <PaginationListView
                    onPageSelected={this.handlePageSelected}
                    selected={this.state.selected}
                    pageNum={this.props.pageNum}
                    pageRangeDisplayed={this.props.pageRangeDisplayed}
                    marginPagesDisplayed={this.props.marginPagesDisplayed}
                    breakLabel = {this.props.breakLabel} />

                <li onClick={this.handleNextPage}>
                    <a href="">{this.props.nextLabel}</a>
                </li>
            </div>
        );
    }
});

var PaginationListView = React.createClass({
    render: function() {
        if (this.props.pageNum <= this.props.pageRangeDisplayed) {
            items = _.range(1, this.props.pageNum + 1).map(function(page, index) {
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
            var leftSide = (this.props.pageRangeDisplayed/2),
                rightSide = (this.props.pageRangeDisplayed - leftSide);

            if (this.props.selected > this.props.pageNum - this.props.pageRangeDisplayed/2) {
                rightSide = this.props.pageNum - this.props.selected;
                leftSide = this.props.pageRangeDisplayed - rightSide;
            }
            else if (this.props.selected < this.props.pageRangeDisplayed/2) {
                leftSide = this.props.selected;
                rightSide = this.props.pageRangeDisplayed - leftSide;
            }

            var items = [],
                breaks = [];

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
                else {
                    items.push(null);
                    breaks.push(page);
                }
            }.bind(this));
        }

        if (typeof(breaks) !== "undefined") {
            items.splice(breaks[0], 0, this.props.breakLabel);
            items.splice(breaks[breaks.length - 1], 0, this.props.breakLabel);
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
                <a href="">{this.props.children}</a>
            </li>
        );
    }
});

React.renderComponent(
    <PaginationBoxView />,
    document.getElementById('react-pagination')
);
