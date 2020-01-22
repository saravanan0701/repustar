import * as React from 'react';
import { WorkbenchDefaultView } from '../../templates/WorkbenchDefaultView';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { RepositorieWorkbenchMergeTags } from '../../repositories/Repositorie.Workbench.MergeTags';
import { IError } from '../../interfaces/Interface.Error';
import { bindActionCreators } from 'redux';
import { setActiveCategory,
    setCategoryList, setTagGroupList, setDisplayGroupList,
    setActiveGroupList, setActiveTagIndex,
    setSearchList, onChangeProps, setActiveSingularTagsList } from '../../redux/redux.workbench.mergetags/redux.workbench.mergetags.action';
import './home.css';
import './mergetags.css'; 
import { tagTypeMapping } from '../../config';
// import { clone, cloneDeep } from "lodash"
import _ from 'lodash';
import {toastr} from 'react-redux-toastr';


interface IState {
    categoryTabs?: [];
    activeTab?: string;
    activeTagGroupIndex?: number;
    displayListType: string;
    articleList?: [];
    error: boolean;
    errorMessage: string;
    rowIndex?: any;
    currentTagGroupId?: string;
    showSearch?: boolean;
    activeSearchList?: [];
    newTagRefObj?: any;
    isSingleGroupSelected?: boolean;
    columnIndex?: number;
    newTag: string;
    tagGroupName?: string;
    isPendingArticle: boolean;
    isLastArticle: boolean;
    acticeArticlesListLength: number;
}
  
interface IProps {
    doHandleArticleTagsResponse?: any;
    mergeTags?: any;
    setCategoryList?: any;
    setTagGroupList?: any;
    setActiveGroupList?: any;
    setActiveTagIndex?: any;
    setDisplayGroupList?:any;
    setSearchList?: any;
    setActiveSingularTagsList?: any;
    setActiveCategory?: any;
    setActiveWBAciveArticles?: any;
    setActiveArticle?: any;
    setActiveArticleIndex?: any;
    history?: any;
    onChangeProps?: any;
}
  
class MergeTags extends WorkbenchDefaultView<IProps, IState> {
    private repositories = new RepositorieWorkbenchMergeTags();
    public constructor(props: any) {
        super(props);
        this.state = {
            categoryTabs: [],
            activeTab:'',
            activeTagGroupIndex: 0,
            displayListType: '',
            articleList: [],
            showSearch: false,
            activeSearchList: [],
            currentTagGroupId: '',
            newTagRefObj:'',
            isSingleGroupSelected: false,
            error: false,
            errorMessage: '',
            rowIndex: '',
            columnIndex: 0,
            newTag: '',
            tagGroupName: '',
            isPendingArticle: false,
            isLastArticle: false,
            acticeArticlesListLength: 0,
        };
        this.handleAddTag = this.handleAddTag.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    public setPageTitle() {
        return 'Merge Tags';
    }

    public setPrivateRoute() {
        return false;
    }

    public componentDidMount() {
        console.log('component Mount');
        if (localStorage.getItem('active_list_type') === 'pending_articles'){
            this.setState({isPendingArticle : true});
        }

        let article_index: any = localStorage.getItem('active_list_id');
        
        this.repositories.getGroupTagsByUser().then((response) => {
            const responseData = response.body;
            const uniqueTabs: any = [...new Set(responseData.map(item => {
                let tag_type: any = item.tag_type;
                return tagTypeMapping[tag_type]
            }))];
            this.props.setCategoryList(uniqueTabs);            
            this.setState({categoryTabs : uniqueTabs});
            this.setState({activeTab : uniqueTabs[0] });
            this.props.setActiveCategory(uniqueTabs[0]);
            this.props.setTagGroupList(responseData);

            const activeList = responseData.filter(item => {
                let tag_type: any = item.tag_type;
                if(tagTypeMapping[tag_type] == uniqueTabs[0]){
                    return item;
                }
            });
            console.log('activeList ', activeList);
            this.props.setActiveGroupList(activeList);
            this.props.setActiveTagIndex(0);
            this.setState({activeTagGroupIndex : 0});
            this.setState({displayListType: 'all_groups'});
            this.props.setDisplayGroupList(activeList);
        }).catch((error: IError) => {
            console.log(error);
        });
    }

    public handleChangeTab(newTab: string){
        this.setState({activeTab : newTab });
        this.setState({rowIndex : ''});
        this.setState({showSearch : false});   
        this.props.setActiveCategory(newTab);
        const activeList = this.props.mergeTags.tag_group_list.filter( (item:any) => {
            let tag_type: any = item.tag_type;
            if(tagTypeMapping[tag_type] == newTab){
                return item;
            }
        });
        this.props.setActiveGroupList(activeList);
        this.props.setActiveTagIndex(0);
        this.setState({activeTagGroupIndex : 0});
        this.setState({displayListType: 'all_groups'});
        // const displayList = [...activeList.filter((item:any) => item.tags_group.length > 1 )];
        this.props.setDisplayGroupList(activeList);
    }

    public selectGroup(activeTagIndex: number){
        this.props.setActiveTagIndex(activeTagIndex);
        this.setState({activeTagGroupIndex : activeTagIndex});
        this.setState({showSearch : false});  
        console.log('activeTagIndex ', activeTagIndex);
        
        console.log('this.props.mergeTags.display_tag_group_list ', this.props.mergeTags.display_tag_group_list);
        if(this.props.mergeTags.display_tag_group_list[activeTagIndex].isSingularGroup){
            this.setState({isSingleGroupSelected: true});
        }else{
            this.setState({isSingleGroupSelected: false});
        }
        //
    }

    public getTags(){
        this.repositories.getGroupTagsByUser().then((response) => {
            const responseData = response.body;
            const uniqueTabs: any = [...new Set(responseData.map(item => {
                let tag_type: any = item.tag_type;
                return tagTypeMapping[tag_type]
            }))];
            this.props.setCategoryList(uniqueTabs);            
            this.setState({categoryTabs : uniqueTabs});
            this.setState({activeTab : uniqueTabs[0] });
            this.props.setActiveCategory(uniqueTabs[0]);
            this.props.setTagGroupList(responseData);

            const activeList = responseData.filter(item => {
                let tag_type: any = item.tag_type;
                if(tagTypeMapping[tag_type] == uniqueTabs[0]){
                    return item;
                }
            });
            console.log('activeList ', activeList);
            this.props.setActiveGroupList(activeList);
            this.props.setActiveTagIndex(0);
            this.setState({activeTagGroupIndex : 0});
            this.setState({displayListType: 'all_groups'});
            this.props.setDisplayGroupList(activeList);
        }).catch((error: IError) => {
            console.log(error);
        });
    }

    public renderTagsCategoryTab(){
        if(this.props.mergeTags.category_list && this.props.mergeTags.category_list.length > 0){
            return this.props.mergeTags.category_list.map((item:any, i:number) => (
                <li className='category_tabs__menu--list' onClick={() => this.handleChangeTab(item)}>
                    <span className='category_tabs__menu--list_item'>
                        {item}
                    </span>
                    {
                        this.props.mergeTags.active_category === item ? <hr className='category_tabs__menu--selected_item'></hr> : ''
                    }
                </li>
            ));
        }
    }

    public selectFilter(filterItem: string){
        this.setState({displayListType: filterItem});
        this.setState({rowIndex : ''});
        this.setState({showSearch : false}); 
        // const active_tag_group_list =  [...this.props.mergeTags.active_tag_group_list];
        const active_tag_group_list = _.cloneDeep(this.props.mergeTags.active_tag_group_list);

        let displayList: any = '';
        if(filterItem === 'all_groups'){
            // displayList = [...active_tag_group_list.filter((item:any) => item.tags_group.length > 1 )];
            this.getTags();
            //displayList = _.cloneDeep(active_tag_group_list.filter((item:any) => item.tags_group.length > 1 ));
        }else if(filterItem === 'singular_tags'){
            console.log('Singular Tags');
            this.props.setDisplayGroupList(displayList);
            this.setState({isSingleGroupSelected : true});
            this.repositories.getSingularTags().then((response) => {
                console.log('response for singular tags ', response.body);
                const responseData = response.body;
                const activeList = responseData.items.filter(item => {
                    let tag_type: any = item.tag_type;
                    if(tagTypeMapping[tag_type] == this.state.activeTab){
                        return item;
                    }
                });
                let lastEvalutedKey: any = '';
                if(responseData.lastEvaluatedKey.id){
                    lastEvalutedKey = responseData.lastEvaluatedKey.id
                }
                this.props.setActiveSingularTagsList(activeList, lastEvalutedKey);
            }).catch((error: IError) => {
                console.log(error);
            });
            // Call the API to get All Singular Tags from the Server

            // displayList = [...active_tag_group_list.filter((item:any) => item.tags_group.length === 1 )];
            // displayList = _.cloneDeep(active_tag_group_list.filter((item:any) => item.tags_group.length === 1 ));
            // let newList:any = [];
            // displayList.map((item:any, i: number) => {
            //     //item.validated_tags_list[0]['is_singular'] = true;
            //     newList.push(item.validated_tags_list[0]);
            //     displayList[0].isSingularGroup = true;
            //     return displayList[0].validated_tags_list = newList;
            // })
            // displayList = [displayList[0]];
        }
        console.log('displayList ', displayList);
        console.log('this.props.mergeTags.active_tag_group_list ', this.props.mergeTags.active_tag_group_list);
        
        this.props.setActiveTagIndex(0);
        this.setState({activeTagGroupIndex : 0});
    }

    public renderFilter(){
        if(this.props.mergeTags.category_list && this.props.mergeTags.category_list.length > 0){
            return(
                <div className='filter_add_group_container'>
                    <div className='filter_container'>
                        <div className='radio_button_container' onClick={() => this.selectFilter('all_groups')}>
                            <input className='tags_radio_button' type='radio' id='react-radio-button-group-1' name='number' value='all_groups' 
                                checked = {this.state.displayListType === 'all_groups' ? true : false }
                            />
                            <label className='radio_label'>View all groups</label>
                        </div>
                        <div className='radio_button_container' onClick={() => this.selectFilter('singular_tags')}>
                            <input className='tags_radio_button' type='radio' id='react-radio-button-group-1' name='number' value='singular_tags' 
                                checked = {this.state.displayListType === 'singular_tags' ? true : false }  
                            />
                            <label className='radio_label'>View singular tags</label>
                        </div>
                    </div>
                    <div className='add_group_container'>
                        <input type='button' value='+ Groups' className='add_group'></input>
                    </div>
                </div>
            )
        }
    }


    public updateTagsGroup(groupIndex: number){
        const tagGroup = this.props.mergeTags.active_tag_group_list.filter((item: any, index: number)=>{
            if(index === groupIndex){
                return item;
            }
        });
        console.log('tagGroup ', tagGroup);
        this.repositories.updateTagsGroup(tagGroup[0], tagGroup[0].id).then((response) => {
            console.log('response ', response.body);
            toastr.success('','Tags Groups Validated Successfully');
            this.getTags();
        });
    }

    handlePropsChange = (prop:any, index: number) => (event:any) => {
        this.props.onChangeProps(prop, index, event.target.value);
    }

    public renderTagGroups(){
        if(this.props.mergeTags.display_tag_group_list && this.props.mergeTags.display_tag_group_list.length > 0){
            return this.props.mergeTags.display_tag_group_list.map((item:any, i:number) => (
                <div>
                    {
                        item.is_validated === 1 
                        ?  <div className='tag_group_container'>
                            {
                                <div className='tag_group_header_container'>
                                    <span className='verified_group_name'>
                                    {item.group_name}
                                    </span>
                                    <span className='ungroup_all'> Verified </span>
                                </div>
                            }

                                <div className='tag_list_container'>
                                    {this.renderTags(item.validated_tags_list, i, item.id, item.is_validated )}
                                </div>
                            </div>
                        : <div className={`tag_group_container ${this.state.activeTagGroupIndex == i ? 'selected_group' : ''}`} 
                            onClick={() => this.selectGroup(i)}>
                            {
                                item.isSingularGroup 
                                ? <div className='tag_group_header_container'>
                                    <span>Singular tags</span>
                                </div>
                                : <div className='tag_group_header_container'>
                                        <input type='text' className='group_name' placeholder='Enter Group name'
                                        onChange={this.handlePropsChange('group_name', i)}
                                        name="tagGroupName"
                                        value={item.group_name}
                                        ></input>
                                        <span className='ungroup_all'> Ungroup all tags </span>
                                    </div>
                            }

                                <div className='tag_list_container'>
                                    {this.renderTags(item.validated_tags_list, i, item.id, item.is_validated )}
                                </div>
                            
                            {
                                this.state.activeTagGroupIndex == i ?
                                <div className='save_tag_button_container'>
                                    <input className='save_tag' type='button' value='Save' onClick={() => this.updateTagsGroup(i)}></input>
                                </div>
                                : <div></div>
                            }
                        </div>
                    }
                </div>
            ));
        }
    }

    public showAddTag(rowIndex: any, itemId: string){
        console.log('this.props.mergeTags.active_tag_group_list ', this.props.mergeTags.active_tag_group_list);
        console.log('itemId ', itemId);
        console.log('this.props.mergeTags.search_list ', this.props.mergeTags.search_list);
        let activeSearchList = this.props.mergeTags.search_list.filter((item: any) => {
            if(this.state.isSingleGroupSelected){
                console.log('Selected Singular Search');
               if(item.is_singular !== true){
                    return item;
               }
            }else{
                if(item.current_id !== itemId){
                    return item;
                }
            }
        });
        console.log('activeSearchList ',  activeSearchList);
        this.setState({activeSearchList: activeSearchList});
        this.setState({rowIndex : rowIndex});
        this.setState({currentTagGroupId : itemId});
    }

    public cancelAddTag(){
        this.setState({rowIndex : ''});
        this.setState({showSearch : false});   
        this.setState({newTag : ''});
        this.setState({newTagRefObj : ''});
    }

    public handleAddTag(e: any){
        this.setState({newTag : e.target.value});
        if(e.target.value.length > 1){
            this.setState({showSearch : true});
            this.repositories.searchTags(e.target.value).then((response) => {
                console.log('Search Response ', response);
                const responseData: any = response.body;
                this.setState({activeSearchList: responseData});
                // console.log('this.state.activeSearchList ', this.state.activeSearchList);
            });
        }else{
            this.setState({showSearch : false});   
        }
    }

    public handleKeyDown(e: any){
        if (e.key === 'Enter') {
            e.preventDefault();

            console.log('Adding New Tag ', e.target.value);
            console.log('newTagRefObj ', this.state.newTagRefObj);
            console.log('rowIndex ', this.state.rowIndex);
            console.log('currentTagGroupId ', this.state.currentTagGroupId);
            console.log('New Tag ', this.state.newTag);
            
            if(this.state.newTagRefObj){
                console.log('Tag');
                console.log('newTagRefObj ', this.state.newTagRefObj);
                if(this.state.newTagRefObj.is_grouped === 1){
                    console.log('Alert the User that the tag is already part of a different group');
                }else{
                    //console.log('Alert the User that the tag is already part of a different group');
                    console.log('filterItem ', this.props.mergeTags.active_tag_group_list);
                    this.props.mergeTags.active_tag_group_list.filter((item: any)=>{
                        if(item.id === this.state.currentTagGroupId){
                            //addedTagGroup
                            item.validated_tags_list.push(e.target.value);
                        }
                    });
                    this.setState({rowIndex : ''});
                    this.setState({showSearch : false});   
                    this.setState({newTag : ''});
                    this.setState({newTagRefObj : ''});
                }
            }else{
                // console.log('Normal Text');
                //const filterItem = this.state.displayListType;
                console.log('filterItem ', this.props.mergeTags.active_tag_group_list);
                this.props.mergeTags.active_tag_group_list.filter((item: any)=>{
                    if(item.id === this.state.currentTagGroupId){
                        //addedTagGroup
                        item.validated_tags_list.push(e.target.value);
                    }
                });
                this.setState({rowIndex : ''});
                this.setState({showSearch : false});   
                this.setState({newTag : ''});
                this.setState({newTagRefObj : ''});
            }
        }
    }

    public addTagBySearch(searchItem: any){
        console.log('searchItem ', searchItem);
        if(searchItem.tag){
            this.setState({newTag : searchItem.tag});
            this.setState({newTagRefObj : searchItem});
        }else{
            this.setState({newTag : searchItem});
            this.setState({newTagRefObj : searchItem});
        }

    }

    public renderSearch(){
        console.log('this.state.activeSearchList ', this.state.activeSearchList);
        
        if(this.state.activeSearchList && this.state.activeSearchList.length >0)
            return this.state.activeSearchList.map((innerItem: any)=>{
            return (<div onClick={() => this.addTagBySearch(innerItem)}><p>{innerItem.tag}</p></div>)
            })
    }

    public renderTagText(item: any, rowIndex: number, isValidated: number){
        console.log('item ', item);
        return(
            <div className='tags_container'>
                <span className='tag_text'>{item}</span>
                {this.state.activeTagGroupIndex == rowIndex ?
                    isValidated === 0 ? 
                        <span className='remove_tag'>Remove</span>
                        :<span></span>
                    :<span></span>
                }
            </div>
        );
    }

    public renderTags(tagList: string[], rowIndex: number, itemId: string, isValidated: number){    
        
        // if(isValidated)
        const content: any =  tagList.map((item:any, i:number) => {
            return this.renderTagText(item, rowIndex, isValidated);
        });

        if(this.state.activeTagGroupIndex == rowIndex && isValidated === 0){
            return(<div className='tag_row'>
                {content}
                <div className='tags_container'>
                    {this.state.rowIndex === rowIndex 
                    ?<div className='add_tag_container'>
                        <div className={`add_new_tag ${this.state.showSearch ? 'search_drop_down' : ''}`} 
                            >
                            <input className='add_new_tag--input' type='text' 
                                onChange={this.handleAddTag}
                                name="newTag"
                                value={this.state.newTag}
                                onKeyDown={(e) => this.handleKeyDown(e)}
                            ></input>
                            {
                                this.state.showSearch
                                ? <div className='search_drop_down_list'>
                                    {
                                        this.state.activeSearchList && this.state.activeSearchList.length > 0
                                        ? this.renderSearch()
                                        : <div></div>
                                    }
                                  </div>
                                : <div></div>
                            }
                        </div>
                        <img src={'./static/close-black.svg'} alt='cancel_tag' className='delete_tag' onClick={() => this.cancelAddTag()}/>
                      </div>
                    : <span className='add_tag' onClick={() => this.showAddTag(rowIndex, itemId)}>+ Add Tag</span>
                    }
                </div>
            </div>)
        }else{
            return(<div className='tag_row'>
                {content}
            </div>)
        }
    }

    public renderContent() {
        console.log('this.props ', this.props.mergeTags);
        if(this.props.mergeTags.category_list && this.props.mergeTags.category_list.length > 0){
            return(<React.Fragment>
                        <div className='merge_tag_container'>
                            <div className='category_tabs_container'>
                                <ul className='category_tabs__menu--ul'>
                                    {this.renderTagsCategoryTab()}
                                </ul>
                            </div>
                            <div className='merge_tag_filter_container'>
                                {this.renderFilter()}
                            </div>
                            <div className='merge_tag_body_container'>
                                {this.renderTagGroups()}
                            </div>
                        </div>
                    </React.Fragment>
                );
        }
    }
}
  
  const mapStateToProps = (state: any): IProps => ({
    mergeTags: state.mergeTags
  });
  
  const mapDispatchToProps = (dispatch: any): IProps => ({
    setActiveCategory: bindActionCreators(setActiveCategory, dispatch),
    setCategoryList: bindActionCreators(setCategoryList, dispatch),
    setTagGroupList: bindActionCreators(setTagGroupList, dispatch),
    setActiveGroupList: bindActionCreators(setActiveGroupList, dispatch),
    setActiveTagIndex: bindActionCreators(setActiveTagIndex, dispatch),
    setDisplayGroupList: bindActionCreators(setDisplayGroupList, dispatch),
    setSearchList:  bindActionCreators(setSearchList, dispatch),
    onChangeProps: bindActionCreators(onChangeProps, dispatch),
    setActiveSingularTagsList: bindActionCreators(setActiveSingularTagsList, dispatch)
  });
  
  export default withRouter(connect<IProps, IProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(MergeTags));