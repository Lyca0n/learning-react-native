import { Button, Textarea, Form, Item, Input, Label } from 'native-base';
import React, { Fragment } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Layout } from '../Components/Layout';
import { NoteForm } from '../Components/NoteForm';
import {NoteContext} from '../Contexts/NoteContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export const ModifyNoteScreen = props => {
    const [note, setNote] = React.useState({title:'', content:'', id:''})
    const {contextNotes, 
        updateContextNote, 
        deleteContextNote} = React.useContext(NoteContext);

    React.useEffect(()=>{
        let noteIndex = contextNotes
        .findIndex( itm => 
            itm.id === props.navigation.state.params.id);

        if(noteIndex > -1){
            const currNote = contextNotes[noteIndex];
            setNote({
                title: currNote.title,
                content: currNote.content,
                id: currNote.id
            })
        }
    },[contextNotes, props.navigation.state.params.id])

    const updateNote = () =>{
        updateContextNote(note, props.navigation.state.params.id)
        props.navigation.navigate('Home');
    }

    const deleteNote = () =>{
        deleteContextNote(props.navigation.state.params.id);
        props.navigation.navigate('Home');
    }
    return(
    <Layout
        title='Edit Note'
        footer={
            <Fragment>
                <Button 
                full 
                onPress={updateNote}>
                    <Text>Update Note</Text>
                </Button>
                <Button 
                full
                onPress={deleteNote}>
                    <Text>Delete Note</Text>
                </Button>
            </Fragment>
        }
    >
        <NoteForm note={note} setNote={setNote} />
    </Layout>
    );
}