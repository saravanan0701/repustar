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
    setSearchList, onChangeProps, setActiveSingularTagsList,
    setLastEvaluatedKey, setNewTagsList } from '../../redux/redux.workbench.mergetags/redux.workbench.mergetags.action';
import './home.css';
import './mergetags.css'; 
import { mergeTagTypeMapping } from '../../config';
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
    showAddNewGroups?: boolean;
    showNewTagName?: boolean;
    isPendingArticle: boolean;
    isLastEvaluatedKey?:boolean;
    newGroupName?: string;
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
    setLastEvaluatedKey?: any;
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
            showAddNewGroups: false,
            showNewTagName: false,
            isPendingArticle: false,
            isLastEvaluatedKey: false,
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
        if (localStorage.getItem('active_list_type') === 'pending_articles'){
            this.setState({isPendingArticle : true});
        }

        let article_index: any = localStorage.getItem('active_list_id');
        
        this.repositories.getGroupTagsByUser().then((response) => {
            const responseData = response.body;
            const uniqueTabs: any = [...new Set(responseData.map(item => {
                let tag_type: any = item.tag_type;
                return mergeTagTypeMapping[tag_type]
            }))];
            this.props.setCategoryList(uniqueTabs);            
            this.setState({categoryTabs : uniqueTabs});
            this.setState({activeTab : uniqueTabs[0] });
            this.props.setActiveCategory(uniqueTabs[0]);
            this.props.setTagGroupList(responseData);

            const activeList = responseData.filter(item => {
                let tag_type: any = item.tag_type;
                if(mergeTagTypeMapping[tag_type] == uniqueTabs[0]){
                    return item;
                }
            });
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
            if(mergeTagTypeMapping[tag_type] == newTab){
                return item;
            }
        });
        this.props.setActiveGroupList(activeList);
        this.props.setActiveTagIndex(0);
        this.setState({activeTagGroupIndex : 0});
        this.setState({displayListType: 'all_groups'});
        this.props.setDisplayGroupList(activeList);
    }

    public selectGroup(activeTagIndex: number){
        this.setState({showAddNewGroups: false});
        this.props.setActiveTagIndex(activeTagIndex);
        this.setState({activeTagGroupIndex : activeTagIndex});
        this.setState({showSearch : false});  
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
                return mergeTagTypeMapping[tag_type]
            }))];
            this.props.setCategoryList(uniqueTabs);            
            this.setState({categoryTabs : uniqueTabs});
            this.setState({activeTab : uniqueTabs[0] });
            this.props.setActiveCategory(uniqueTabs[0]);
            this.props.setTagGroupList(responseData);

            const activeList = responseData.filter(item => {
                let tag_type: any = item.tag_type;
                if(mergeTagTypeMapping[tag_type] == uniqueTabs[0]){
                    return item;
                }
            });
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
        const active_tag_group_list = _.cloneDeep(this.props.mergeTags.active_tag_group_list);

        let displayList: any = '';
        if(filterItem === 'all_groups'){
            this.setState({showAddNewGroups: false});
            this.setState({isSingleGroupSelected : false});
            this.props.setDisplayGroupList([]);
            this.getTags();
        }else if(filterItem === 'singular_tags'){
            this.setState({showAddNewGroups: false});
            this.props.setDisplayGroupList(displayList);
            this.setState({isSingleGroupSelected : true});
            let last_evaluated_key = '';
            if(this.props.mergeTags.last_evaluated_key){
                last_evaluated_key = this.props.mergeTags.last_evaluated_key;
            }
            this.repositories.getSingularTags(last_evaluated_key).then((response) => {
                const responseData = response.body;
                const activeList = responseData.items.filter(item => {
                    let tag_type: any = item.tag_type;
                    if(mergeTagTypeMapping[tag_type] == this.state.activeTab && item.is_grouped === 0){
                        return item;
                    }
                });
                let lastEvalutedKey: any = '';
                if(responseData.lastEvaluatedKey.id){
                    lastEvalutedKey = responseData.lastEvaluatedKey.id;
                    this.props.setLastEvaluatedKey(lastEvalutedKey);
                    this.setState({isLastEvaluatedKey:  true});
                }else{
                    this.props.setLastEvaluatedKey('');
                    this.setState({isLastEvaluatedKey:  false});
                }
                this.props.setDisplayGroupList(activeList);
                this.props.setActiveSingularTagsList(activeList);
                
            }).catch((error: IError) => {
                console.log(error);
            });
        }
        this.props.setActiveTagIndex(0);
        this.setState({activeTagGroupIndex : 0});
    }

    public showAddNewGroups(){
        this.setState({showAddNewGroups: true});
        this.setState({activeTagGroupIndex: -1});
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
                    {
                        this.state.isSingleGroupSelected
                        ?
                        <div className='add_group_container'>
                            <input type='button' value='+ Tags' className='add_group' onClick={() => this.showAddNewGroups()}></input>
                        </div>
                        :
                        <div className='add_group_container'>
                            <input type='button' value='+ Groups' className='add_group' onClick={() => this.showAddNewGroups()}></input>
                        </div>
                    }
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
        this.repositories.updateTagsGroup(tagGroup[0], tagGroup[0].id).then((response) => {
            toastr.success('','Tags Groups Validated Successfully');
            this.getTags();
        });
    }

    public saveTagsGroup(){
        let allTagTypes:any = Object.keys(mergeTagTypeMapping);
        const tag_type = allTagTypes.filter((item: any)=>{
            if(mergeTagTypeMapping[item] === this.state.activeTab){
                return item;
            }
        })

        let group_name: any = this.state.newGroupName;


        this.repositories.saveTagsGroup(this.props.mergeTags.new_tag_group, tag_type [0], group_name).then((response) => {
            toastr.success('','Tags Groups Validated Successfully');
            this.setState({showAddNewGroups: false});
            this.setState({newGroupName: ''});
            this.setState({showSearch : false});   
            this.setState({newTag : ''});
            this.setState({newTagRefObj : ''});
            this.getTags();
        });
    }

    public saveTags(){
        
        let allTagTypes:any = Object.keys(mergeTagTypeMapping);
        const tag_type = allTagTypes.filter((item: any)=>{
            if(mergeTagTypeMapping[item] === this.state.activeTab){
                return item;
            }
        })

        this.repositories.saveTags(this.state.newTag, tag_type [0]).then((response) => {
            toastr.success('','Tags Added Successfully');
            this.setState({showAddNewGroups: false});
            this.setState({newGroupName: ''});
            this.setState({showSearch : false});   
            this.setState({newTag : ''});
            this.setState({newTagRefObj : ''});
        });

    }

    handlePropsChange = (prop:any, index: number) => (event:any) => {
        this.props.onChangeProps(prop, index, event.target.value);
    }

    handleNewNameChange = () =>  (event:any) => {
        this.setState({newGroupName : event.target.value})
    }

    public renderTagGroups(){
        if(this.props.mergeTags.display_tag_group_list && this.props.mergeTags.display_tag_group_list.length > 0){
            if(this.state.isSingleGroupSelected){
                return (
                    <div>
                        <div className='tag_group_container'>
                        {
                            <div className='tag_group_header_container'>
                                <span className='verified_group_name'>
                                Singular Tags
                                </span>
                            </div>
                        }

                            <div className='tag_list_container'>
                                {this.renderSingularTags(this.props.mergeTags.display_tag_group_list )}
                            </div>
                            {
                                this.state.isLastEvaluatedKey
                                ?<div>
                                    <input className='load_more' type='button' value='Load More' onClick={() => this.loadMoreSingularTags()}></input>
                                </div>
                                : <div></div>
                            }
                        </div>
                    </div>
                )
            }else{
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
    }

    public showAddTag(rowIndex: any, itemId: string){
        let activeSearchList = this.props.mergeTags.search_list.filter((item: any) => {
            if(this.state.isSingleGroupSelected){
               if(item.is_singular !== true){
                    return item;
               }
            }else{
                if(item.current_id !== itemId){
                    return item;
                }
            }
        });
        this.setState({activeSearchList: activeSearchList});
        this.setState({rowIndex : rowIndex});
        this.setState({currentTagGroupId : itemId});
    }

    public showNewAddTag(){
        this.setState({showNewTagName : true});
    }

    public cancelAddTag(){
        this.setState({rowIndex : ''});
        this.setState({showSearch : false});   
        this.setState({newTag : ''});
        this.setState({newTagRefObj : ''});
        this.setState({showNewTagName : false});
    }

    public handleAddTag(e: any){
        this.setState({newTag : e.target.value});
        if(e.target.value.length > 1){
            this.setState({showSearch : true});
            this.repositories.searchTags(e.target.value).then((response) => {
                const responseData: any = response.body;
                this.setState({activeSearchList: responseData});
            });
        }else{
            this.setState({showSearch : false});   
        }
    }

    public handleNewGroupTagKeyDown(e: any){
        if (e.key === 'Enter') {
            e.preventDefault();
            if(this.state.newTagRefObj){
                this.props.mergeTags.new_tag_group.push(e.target.value);
                this.setState({newTag : ''});
                this.setState({showNewTagName : false});
                this.setState({showSearch : false});   
                this.setState({newTagRefObj : ''});
            }else{
                this.props.mergeTags.new_tag_group.push(e.target.value);
                this.setState({newTag : ''});
                this.setState({showNewTagName : false});
                this.setState({showSearch : false});   
                this.setState({newTagRefObj : ''});
            }
        }
    }

    public handleNewTagKeyDown(e: any){
        if (e.key === 'Enter') {
            e.preventDefault();
            if(this.state.newTagRefObj){
                this.setState({newTag : ''});
                this.setState({showNewTagName : false});
                this.setState({showSearch : false});   
                this.setState({newTagRefObj : ''});
            }else{
                this.setState({showNewTagName : false});
                this.setState({showSearch : false});   
                this.setState({newTagRefObj : ''});
            }
        }
    }

    public handleKeyDown(e: any){
        if (e.key === 'Enter') {
            e.preventDefault();

            if(this.state.newTagRefObj){
                if(this.state.newTagRefObj.is_grouped === 1){
                    console.log('Alert the User that the tag is already part of a different group');
                }else{
                    //console.log('Alert the User that the tag is already part of a different group');
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

    public removeTag(tag: string, rowIndex: number){
        let removeTagGroup = this.props.mergeTags.active_tag_group_list.filter((item: any, index: number)=>{
            if(index === rowIndex){
                if(item['validated_tags_list'].indexOf(tag) > -1){
                    const columnIndex = item['validated_tags_list'].indexOf(tag);
                    item['validated_tags_list'].splice(columnIndex, 1);
                    item['validated_tags_list'] = item['validated_tags_list'];
                }
                return item;
            }
        });
        this.repositories.removeTagFromGroup(tag, removeTagGroup[0].id, removeTagGroup[0].validated_tags_list).then((response) => {
            console.log('response ', response.body);
            toastr.success('','Tags Removed from the group Successfully');
            //this.getTags();
        });
    }

    public renderTagText(item: any, rowIndex: number, isValidated: number){
        return(
            <div className='tags_container'>
                <span className='tag_text'>{item}</span>
                {this.state.activeTagGroupIndex == rowIndex ?
                    isValidated === 0 ? 
                        <span className='remove_tag' onClick={() => this.removeTag(item, rowIndex)}>Remove</span>
                        :<span></span>
                    :<span></span>
                }
            </div>
        );
    }

    public renderNewTagText(item: any){
        return(
            <div className='tags_container'>
                <span className='tag_text'>{item}</span>
            </div>
        );
    }

    public deleteTag(tagDetail: any, index: number){
        this.props.mergeTags.active_singular_tags_list.splice(index, 1);
        this.props.mergeTags.active_singular_tags_list = this.props.mergeTags.active_singular_tags_list;
        this.repositories.deleteTagFromDirectory(tagDetail.tag).then((response) => {
            toastr.success('','Tags Deleted Successfully');
            this.props.setDisplayGroupList(this.props.mergeTags.active_singular_tags_list);
            this.props.setActiveSingularTagsList(this.props.mergeTags.active_singular_tags_list);
        });
    }

    public renderSingluarTagText(item: any, index: number){
        return(
            <div className='tags_container'>
                <span className='tag_text'>{item.tag}</span>
                <span className='remove_tag' onClick={() => this.deleteTag(item, index)}>Delete</span>
            </div>
        );
    }

    public loadMoreSingularTags(){
        this.repositories.getSingularTags(this.props.mergeTags.last_evaluated_key).then((response) => {
            const responseData = response.body;
            const activeList = responseData.items.filter(item => {
                let tag_type: any = item.tag_type;
                if(mergeTagTypeMapping[tag_type] == this.state.activeTab && item.is_grouped === 0){
                    return item;
                }
            });
            let lastEvalutedKey: any = '';
            if(responseData.lastEvaluatedKey.id){
                lastEvalutedKey = responseData.lastEvaluatedKey.id;
                this.props.setLastEvaluatedKey(lastEvalutedKey);
                this.setState({isLastEvaluatedKey:  true});
            }else{
                this.props.setLastEvaluatedKey('');
                this.setState({isLastEvaluatedKey:  false});
            }
            let newActiveList = [...this.props.mergeTags.display_tag_group_list, ...activeList]
            this.props.setDisplayGroupList(newActiveList);
            this.props.setActiveSingularTagsList(newActiveList);
            
        }).catch((error: IError) => {
            console.log(error);
        });
    }

    public renderSingularTags(tagList: string[]){
        const content: any =  tagList.map((item:any, i:number) => {
            return this.renderSingluarTagText(item, i);
        });
        return(
            <div className='tag_row'>
                {content}
            </div>);
    }

    public renderNewTags(tagList: any){
        const content =  tagList.map((item:any, i:number) => {
                return this.renderNewTagText(item);
        });
        

        if(this.state.showAddNewGroups){
            return(<div className='tag_row'>
                {content}
                <div className='tags_container'>
                    {this.state.showNewTagName 
                        ?<div className='add_tag_container'>
                            <div className={`add_new_tag ${this.state.showSearch ? 'search_drop_down' : ''}`} 
                                >
                                <input className='add_new_tag--input' type='text' 
                                    onChange={this.handleAddTag}
                                    name="newTag"
                                    value={this.state.newTag}
                                    onKeyDown={(e) => this.handleNewGroupTagKeyDown(e)}
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
                    : <span className='add_tag' onClick={() => this.showNewAddTag()}>+ Add Tag</span>
                    }
                </div>
            </div>)
        }
    }

    public renderTags(tagList: string[], rowIndex: number, itemId: string, isValidated: number){    
        
        // if(isValidated)
        const content: any =  tagList.map((item:any, i:number) => {
            return this.renderTagText(item, rowIndex, isValidated);
        });

        if((this.state.activeTagGroupIndex == rowIndex && isValidated === 0)){
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

    public renderAddGroups(){
        if(this.state.isSingleGroupSelected){
            return(
                <div className='add_singular_tag_container selected_group'>
                    <div className='add_tag_list_container'>
                        <input type='text' className='group_name' placeholder='Enter Tag Name'
                            onChange={this.handleAddTag}
                            name="newTag"
                            value={this.state.newTag}
                            onKeyDown={(e) => this.handleNewTagKeyDown(e)}
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
                    <div className='save_sigular_tag_button_container'>
                        <input className='save_tag' type='button' value='Save' onClick={() => this.saveTags()}></input>
                    </div>
                </div>
            );
        }else{
            return(
                <div className='tag_group_container selected_group'>
                    <div className='tag_group_header_container'>
                        <input type='text' className='group_name' placeholder='Enter Group name'
                         onChange={this.handleNewNameChange()}
                        // name="tagGroupName"
                            value={this.state.newGroupName}
                        ></input>
                        <span className='ungroup_all'></span>
                    </div>
                    <div className='tag_list_container'>
                        {this.renderNewTags(this.props.mergeTags.new_tag_group)}
                    </div>
                    <div className='save_tag_button_container'>
                        <input className='save_tag' type='button' value='Save' onClick={() => this.saveTagsGroup()}></input>
                    </div>
                </div>
            );
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
                            {
                                this.state.showAddNewGroups 
                                ? <div className='merge_tag_body_container'>
                                    {this.renderAddGroups()}
                                </div>
                                : <div></div>
                            }
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
    setActiveSingularTagsList: bindActionCreators(setActiveSingularTagsList, dispatch),
    setLastEvaluatedKey: bindActionCreators(setLastEvaluatedKey, dispatch),
  });
  
  export default withRouter(connect<IProps, IProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(MergeTags));