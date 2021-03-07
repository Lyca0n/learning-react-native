import React, { Fragment, useState, useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Textarea, Form, Item, Input, Label } from 'native-base';
import { Layout } from '../Components/Layout';
import { NoteContext } from '../Contexts/NoteContext';
import { NoteForm } from '../Components/NoteForm';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export const AddNoteScreen = props => {
    const [newNote, setNewNote] = useState({ title: '', content: '', id: new Date().getMilliseconds().toString() });
    const { addContextNote } = useContext(NoteContext);

    const saveNote = () => {
        addContextNote(newNote)
        props.navigation.navigate('Home')
    }

    return (
    <Layout
        title="Add Note"
        footer={
            <Fragment>
                <Button full onPress={() => props.navigation.navigate('Home')}>
                    <Text>Cancel</Text>
                </Button>
                <Button full onPress={saveNote}>
                    <Text>SaveNote</Text>
                </Button>
            </Fragment>
        }
    >
        <NoteForm note={newNote} setNote={setNewNote} />
    </Layout>
    );
}