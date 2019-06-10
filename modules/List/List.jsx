import React from 'react';
import classnames from 'classnames';
import Section from '../Section/Section';
import Search from '../Search/Search';
import Label from '../Label/Label';
import style from './list.css';
import MarkItem from './MarkItem';
import JunkEmailItem from './JunkEmailItem';

const List = (props) => {
  const {
      id,
      listContainer,
      ifEnableRemind,
      remindMessage,
      children,
      onClickRemindMessage,
      onLoadMoreData,
      noDataDescription,
      ifHasSearch,
      disabledSearch,
      placeHolder,
      searchValue,
      ifLoading,
      onSearchChange,
      onSearch,
      onSearchReset,
    } = props;

  if (ifLoading) {
    return (
      <div className={classnames(style.listContainer, listContainer)}>
        Loading...
      </div>
    );
  }
  return (
    <div className={classnames(style.listContainer, listContainer)}>
      {ifHasSearch && (
        <div className={style.searchSection}>
          <Search
            id={id}
            disabled={disabledSearch}
            placeHolder={placeHolder}
            searchValue={searchValue}
            onChange={onSearchChange}
            onSearch={onSearch}
            onReset={onSearchReset}
          />
        </div>
      )}
      <Section
        panelClass={style.list}
        loadData={onLoadMoreData}
      >
        {children}
        {ifEnableRemind && (noDataDescription || remindMessage) && (
          <div
            className={style.remindContainer}
          >
            {noDataDescription && (
              <Label
                className={style.noData}
                text={noDataDescription}
              />
            )}
            {remindMessage && (
              <Label
                className={style.loadMore}
                text={remindMessage}
                onClick={onClickRemindMessage}
              />
            )}
          </div>
        )}
      </Section>
    </div>
  );
};

List.defaultProps = {
  ifLoading: false,
  ifEnableRemind: false,
  listContainer: '',
  count: 0,
  remindMessage: 'More...',
  onLoadMoreData: _ => _,
  noDataDescription: 'no data',
  ifHasSearch: true,
};

List.propTypes = {
  /** identity id */
  id: React.PropTypes.number,
  /** list container style */
  listContainer: React.PropTypes.string,
  ifLoading: React.PropTypes.bool,
  /** for search */
  searchValue: React.PropTypes.string,
  placeHolder: React.PropTypes.string,
  disabledSearch: React.PropTypes.bool,
  ifHasSearch: React.PropTypes.bool,
  onSearchChange: React.PropTypes.func,
  onSearch: React.PropTypes.func,
  onSearchReset: React.PropTypes.func,
  /** for list  */
  ifEnableRemind: React.PropTypes.bool,
  noDataDescription: React.PropTypes.string,
  remindMessage: React.PropTypes.string,
  count: React.PropTypes.number,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.shape({})),
    React.PropTypes.bool,
    React.PropTypes.shape({}),
  ]),
  onClickRemindMessage: React.PropTypes.func.isRequired,
  onLoadMoreData: React.PropTypes.func,
};

List.MarkItem = MarkItem;
List.JunkEmailItem = JunkEmailItem;

export default List;
