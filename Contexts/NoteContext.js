import React, {createContext, Component} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const errorHandler = e =>{
    Alert.alert(
        'notes Error',
        `Sorry about the issue ${e}`,
        [
            {text: "ok"},            
        ],
        {cancelable: false}
    )
}
export const NoteContext = createContext();

export class NoteProvider extends Component{
    constructor(props){
        super(props);

        this.getContextNotes = async ()=> {
            try{                
                const fetchedNotes = await AsyncStorage.getItem('@notes');                   
                console.log("from storage fetch", fetchedNotes)                                            
                if(fetchedNotes){
                    this.setState({contextNotes: fetchedNotes})
                }
                console.log("from context", this.state.contextNotes)
                return this.state.contextNotes
            }catch(e){
                errorHandler(e)
            }
            
        }
        this.addContextNote = newNote => {
            const {contextNotes} =  this.state;
            contextNotes.push(newNote)
            this.setState({contextNotes}, async()=> await this.storeData())            
        }
        this.updateContextNote = (note, id) => {
            const {contextNotes} =  this.state;
            const noteIndex  =  contextNotes.findIndex(item => item.id === id);
            contextNotes[noteIndex].title = note.title
            contextNotes[noteIndex].content= note.content
            this.setState({contextNotes}, async()=> await this.storeData())       
        }
        this.deleteContextNote = (id) =>{
            const {contextNotes} =  this.state;
            this.setState({contextNotes: contextNotes.filter(itm => itm.id !== id)}
            , async()=> await this.storeData())
        }
        this.state = {
            addContextNote: this.addContextNote,
            getContextNotes: this.getContextNotes,
            updateContextNote: this.updateContextNote,
            deleteContextNote: this.deleteContextNote,
            contextNotes: []
        };
    }

    storeData = async ()=>{
        try{                       
            await AsyncStorage.setItem('@notes',JSON.stringify([...this.state.contextNotes]))
        }catch(e){
            errorHandler(e)
        }
    }

    render (){
        return (
            <NoteContext.Provider value={this.state}>
                {this.props.children}
                </NoteContext.Provider>
        )
    }
}