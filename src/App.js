import React from 'react';
import './App.css';

import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

const firebase = require('firebase')

class App extends React.Component{

  constructor(){
    super();
    this.state={
      selectedNoteIndex: null,
      selectedNote: null,
      notes: []
    }
  }
  render(){
    return(
      <div className="app-container">
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        ></SidebarComponent>
        {this.state.selectedNote ?(<EditorComponent  //Only render if we have a selectedNote
          selectedNote= {this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          noteUpdate={this.noteUpdate}
          ></EditorComponent>) : null}
      </div>
    )
  }

  componentDidMount = () =>{
    firebase 
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
          const notes = serverUpdate.docs.map(_doc =>{
            const data = _doc.data();
            data['id'] = _doc.id;
            return data
          });

          this.setState({notes: notes})
      }); 
      //whenever "notes" changes the function inside onsnapshot runs
  }

  selectNote = (note,index) => {
    this.setState({
            selectedNoteIndex: index,
            selectedNote: note})
  }

  noteUpdate = (id, noteObj) => { //update firebase
    firebase  
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  newNote = async (title) =>{
    const note = {
      title: title,
      body: ''
    }
    const newFromDB = await 
      firebase
        .firestore()
        .collection('notes')
        .add({
          title:note.title,
          body: note.body,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    const newID = newFromDB.id
    await this.setState({notes: [...this.state.notes, note]})
    const newNoteIndex = 
          this.state.notes.indexOf(
                this.state.notes.filter(_note => _note.id === newID)[0])
    await this.setState({
            selectedNote: this.state.notes[newNoteIndex],
            selectedNoteIndex: newNoteIndex
          })
  }

  deleteNote = async (note) => {
    await this.setState({notes: this.state.notes.filter(_note => _note !== note)})
    const newSelectedNoteIndex = this.state.notes.indexOf(this.state.selectedNote)
    await this.setState({selectedNoteIndex: newSelectedNoteIndex, selectedNote: this.state.notes[newSelectedNoteIndex]})

    firebase 
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }

}

export default App;
