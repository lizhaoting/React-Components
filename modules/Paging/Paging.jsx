import React, {Component, PropTypes } from 'react';
import classnames from 'classnames';
import Style from './Paging.css';

class Paging extends Component {
    constructor (props) {
        super(props);
        this.state = {
            maxPageIndex: Math.ceil(props.totalData / props.CountPerPage) - 1,
            correctPage: props.correctPage,
            CountPerPage: props.CountPerPage,
            showOptions: false,
            firstDataIndex: 0,
        };
        this.correctPageEle = null;
        this.pageIndexChange = this.pageIndexChange.bind(this);
        this.CountPerPageChange = this.CountPerPageChange.bind(this);
    }

    componentWillUpdate (nextProps, nextState) {
        if (nextState.correctPage !== this.state.correctPage) {
            this.correctPageEle.value = nextState.correctPage + 1;
        }
        if (nextProps.totalData !== this.props.totalData) {
            this.setState({correctPage: 0,
                maxPageIndex: Math.ceil(nextProps.totalData / this.state.CountPerPage) - 1});
        }
        this.setState({correctPage: nextProps.correctPage});
    }

    pageIndexChange (_index) {
        let index = _index > 0 ? _index : 0;
        if (index > this.state.maxPageIndex) {index = this.state.maxPageIndex;}
        if (index !== this.state.correctPage) {
            const firstDataIndex = index * this.state.CountPerPage + 1;
            this.setState({correctPage: index, firstDataIndex });
            this.props.correctPageChange(index, this.state.CountPerPage);
        }
    }

    CountPerPageChange (CountPerPage) {
        const maxPageIndex = Math.ceil(this.props.totalData / CountPerPage) - 1;
        // const firstIndex =  (this.state.correctPage - 1) * this.state.CountPerPage + 1;
        let correctPage = Math.floor(this.state.firstDataIndex / CountPerPage);
        correctPage = correctPage > maxPageIndex ? maxPageIndex : correctPage;
        this.setState({
            maxPageIndex: maxPageIndex,
            correctPage: correctPage > 0 ? correctPage : 0,
            CountPerPage: CountPerPage,
        });
        this.props.correctPageChange(correctPage, CountPerPage);
    }

    render () {
        const { CountPerPageOption} = this.props;
        return (
            <div className={Style.paging}>
                <span
                    onClick={() => {this.pageIndexChange(0);}}
                    className={Style.firstpage}
                ></span>
                <span
                    onClick={() => {this.pageIndexChange(this.state.correctPage - 1);}}
                    className={Style.prevpage}
                ></span>
                <input
                    ref={(ele) => {this.correctPageEle = ele;}}
                    type="text"
                    className={classnames(Style.pagenum, Style.text)}
                    defaultValue={this.state.correctPage + 1}
                    onBlur={(e) => {this.pageIndexChange(e.target.value);}}
                />
                <span> / </span>
                <span>{this.state.maxPageIndex + 1}</span>
                <span
                    onClick={() => {this.pageIndexChange(this.state.correctPage + 1);}}
                    className={Style.nextpage}
                ></span>
                <span
                    onClick={() => {this.pageIndexChange(this.state.maxPageIndex);}}
                    className={Style.lastpage}></span>
                <span>Page Size: </span>
                <div className={classnames(Style.selectBoxLikeness, Style.selectPagesize)}>
                    <span
                        onClick={() => {this.setState({showOptions: true});}}
                        className={Style.selected} style={{width: '45px'}}
                    >
                        {this.state.CountPerPage}
                    </span>
                    <div
                        style={{display: this.state.showOptions ? 'block' : 'none'}}
                        className={Style.selectOptions}
                    >
                        {CountPerPageOption && CountPerPageOption.map((item) => <span
                            key={`option_${item}`}
                            className={Style.selectOption}
                            onClick={() => {
                                this.setState({showOptions: false});
                                this.CountPerPageChange(item);
                            }}
                        >{item}</span>)}
                    </div>
                </div>
            </div>);
    }

}
Paging.propTypes = {
    totalData: PropTypes.number,
    correctPage: PropTypes.number,
    CountPerPage: PropTypes.number,
    CountPerPageOption: PropTypes.arrayOf(PropTypes.number),
    correctPageChange: PropTypes.func,
};
export default Paging;
