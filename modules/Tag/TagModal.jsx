import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
import Icon from '../Icon/Icon';
import style from './tags.css';

const isDuplicate = (tag, tags) => tags.find(item => item.name === tag) === undefined;
const tagMerge = (tag, selected) => {
  if (_.find(selected, a => a.id === tag.id)) {
    tag.selected = true;
  } else {
    tag.selected = false;
  }
  return tag;
};

class TagModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.ifAdd ?
        _.cloneDeep(props.tags.map(tag => tagMerge(tag, props.selected))) :
        _.cloneDeep(props.tags),
      editing: false,
      editIndex: -1,
      tmpEditTag: '',
      tmpNewTag: '',
      selected: props.selected,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onTagClick = this.onTagClick.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onEditBlur = this.onEditBlur.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.close = this.close.bind(this);
    this.okClick = this.okClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }

  shouldComponentUpdate(nextState, nextProps) {
    return !_.isEqual(this.state.tags, nextState.tags) ||
      !_.isEqual(this.props.ifAdd, nextProps.ifAdd) ||
      !_.isEqual(this.state.selected, nextState.selected);
  }

  onBlur() {
    if (this.state.tmpNewTag.trim() !== '' && isDuplicate(this.state.tmpNewTag, this.state.tags)) {
      const selected = this.props.ifAdd ? true : undefined;
      this.setState({
        tags: _.concat(this.state.tags, {
          name: this.state.tmpNewTag,
          id: 0,
          ticketNum: 0,
          selected,
        }),
        editing: false,
        tmpNewTag: '',
      });
    } else {
      this.setState({
        editing: false,
        tmpNewTag: '',
      });
    }
  }

  onTagClick(tag) {
    const tmp = this.state.tags;
    const item = this.state.tags.find(t => t.name === tag.name);
    if (item) {
      item.selected = !item.selected;
      this.setState({
        tags: tmp,
      });
    }
  }

  onEditClick(name, id, index) {
    this.setState({
      editIndex: index,
      tmpEditTag: name,
    });
  }

  onEditBlur() {
    const tmp = this.state.tags;
    if (this.state.tmpEditTag.replace(/ /g, '') !== '' &&
      !tmp.find(item => item.name === this.state.tmpEditTag)) {
      tmp[this.state.editIndex].name = this.state.tmpEditTag;
      this.setState({
        tags: tmp,
        editIndex: -1,
        tmpEditTag: '',
        editing: false,
      });
    } else {
      this.setState({
        editIndex: -1,
        tmpEditTag: '',
        editing: false,
      });
    }
  }

  onDelete(tag) {
    this.setState({
      tags: _.remove(this.state.tags, item => item.name !== tag.name),
    });
  }

  handleEnterPress(e) {
    e.target.addEventListener('keydown', (keyboardEvent) => {
      if (keyboardEvent.keyCode === 13) {
        this.onBlur();
      }
    });
  }

  okClick() {
    const {
      onCreateTags,
      onEditTags,
      onDeleteTags,
      onSelected,
      onClose,
     } = this.props;
    const tagIds = [];
    const selected = [];
    const tags = this.state.tags.map((item) => {
      tagIds.push(item.id);
      if (item.selected) {
        selected.push(item);
      }
      return {
        id: item.id,
        name: item.name,
        selected: item.selected,
      };
    });
    const tagsBak = this.props.tags;
    const addTags = _.filter(tags, a => a.id === 0);
    if (addTags && addTags.length > 0) {
      onCreateTags(addTags);
    }
    const editTags = [];
    tags.forEach((tag) => {
      if (tag.id !== 0) {
        const tagBak = _.find(tagsBak, a => a.id === tag.id);
        if (tagBak.name !== tag.name) {
          editTags.push(tag);
        }
      }
    });
    if (editTags.length > 0) {
      onEditTags(editTags);
    }
    const deleteTags = _.filter(tagsBak, a => !_.includes(tagIds, a.id));
    if (deleteTags && deleteTags.length > 0) {
      onDeleteTags(deleteTags);
    }
    if (onSelected && _.isFunction(onSelected)) {
      onSelected(selected);
    }
    onClose();
  }

  cancelClick() {
    this.setState({ tags: Object.assign([], this.props.tags) });
    this.props.onClose();
  }

  close() {
    this.setState({
      tags: Object.assign([], this.props.tags),
    });
    this.props.onClose();
  }

  render() {
    const props = this.props;

    const renderTag = (item, index) => {
      if (props.ifAdd) {
        return (
          <div
            key={`item-${item.name}`}
            className={classnames(style.tagItem, item.selected ? style.selected : null)}
            onClick={() => { this.onTagClick(item); }}
            role={'presentation'}
          >
            {item.name}
          </div>
        );
      }
      return (
        index === this.state.editIndex
          ? <Input
            type="text"
            meta={{}}
            key={`item-${index}`}
            maxLength={256}
            autoFocus
            input={{
              value: this.state.tmpEditTag,
              onChange: (e) => {
                if (e.target.value.length <= 200) {
                  this.setState({ tmpEditTag: e.target.value });
                }
              },
              onBlur: this.onEditBlur,
              onFocus: this.handleEnterPress,
            }}
          />
          : <div key={`item-${index}`} className={style.tagItem}>
            {item.name}
            <span className={style.articleNum}>{item.ticketNum}</span>
            <div className={style.ops}>
              <Icon
                type={Icon.types.edit}
                size={16}
                onClick={() => { this.onEditClick(item.name, item.id, index); }}
              />
              <Icon type={Icon.types.trash} size={16} onClick={() => { this.onDelete(item); }} />
            </div>
          </div>
      );
    };
    return (
      <Modal
        title={props.ifAdd ? 'Add Tags' : 'Manage Tags'}
        closeModal={this.close}
        className={style.tagModalHeight}
        actions={{
          okProps: {
            text: props.ifAdd ? 'OK' : 'Save',
            eventClick: this.okClick,
          },
          cancelProps: {
            text: 'Cancel',
            eventClick: this.cancelClick,
          },
        }}
      >
        <div className={classnames(style.tagModal, !props.ifAdd ? style.manage : null)}>
          {
            this.state.tags.map(renderTag)
          }
          {
            this.state.editing
              ? <Input
                type="text"
                meta={{}}
                maxLength={256}
                autoFocus
                input={{
                  value: this.state.tmpNewTag,
                  onChange: (e) => { this.setState({ tmpNewTag: e.target.value }); },
                  onBlur: this.onBlur,
                  onFocus: this.handleEnterPress,
                }}
              />
              : <div
                role={'presentation'}
                className={style.addItem}
                onClick={() => { this.setState({ editing: true }); }}
              >
                <Icon type={Icon.types.add} size={20} color={'#bbb'} hoverColor={'#646464'} />
              </div>
          }
        </div>
      </Modal>
    );
  }
}

TagModal.propTypes = {
  ifAdd: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selected: PropTypes.arrayOf(PropTypes.shape({})),
  onCreateTags: PropTypes.func,
  onDeleteTags: PropTypes.func,
  onEditTags: PropTypes.func,
  onSelected: PropTypes.func,
  onClose: PropTypes.func,
};

export default TagModal;
