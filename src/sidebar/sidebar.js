import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebarItem';

class SidebarComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        addingNote: false,
        title: null
      };
    }
    render(){
      const {notes, classes, selectedNoteIndex} = this.props
        return(
          <div className={classes.sidebarContainer}>
            {/* New note button   */}
            <Button
              onClick={this.newNoteBtnClick}
              className={classes.newNoteBtn}>
                  {this.state.addingNote ? "Cancel" : "New Note"}
            </Button>
            {/* Input  + Submit button */}
            {
                this.state.addingNote ?
                 <div>
                  <input type="text"
                          className={classes.newNoteInput}
                          placeholder="Enter note title"
                          onKeyUp={(e) => this.updateTitle(e.target.value)}>
                          </input>
                  <Button 
                    className={classes.newNoteSubmitBtn}
                    onClick={this.newNote}>
                      Submit Note
                  </Button>
                 </div> 
              
                 :null
              }

              <List>
                {notes.map((_note, _index) => {
                    return(
                      <div key={_index}>
                        <SidebarItemComponent
                          _note= {_note}
                          _index= {_index}
                          selectedNoteIndex = {selectedNoteIndex}
                          selectNote ={this.selectNote}
                          deleteNote ={this.deleteNote}>
                        </SidebarItemComponent>
                        <Divider></Divider>
                      </div>
                    )
                })}
              </List>

              
          </div>
        )
    }
    newNoteBtnClick = () =>{
      this.setState({addingNote: !this.state.addingNote,
                      title: null}) //addingNote set to true to show input for entering title on new note
                                    //if i click it again, it always clear the title on state 
    }

    updateTitle = (txt) => {
      this.setState({title: txt})
    }

    newNote = () =>{
      this.props.newNote(this.state.title)
      this.setState({title:null, addingNote:false})
    }

    selectNote = (note,index) => {
      this.props.selectNote(note,index)
    }
    deleteNote = (note) => {
      this.props.deleteNote(note)
    }
}

export default withStyles(styles)(SidebarComponent);