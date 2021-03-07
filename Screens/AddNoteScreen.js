import React, { Fragment, useState, useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Textarea, Form, Item, Input, Label } from 'native-base';
import { Layout } from '../Components/Layout';
import { NoteContext } from '../Contexts/NoteContext';

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

    const onChange = (value, name) => {
        setNewNote({
            ...newNote,
            [name]: value
        })
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
        <Form style={styles.container}>
            <Item>
                <Label>Title:</Label>
                <Input
                    value={newNote.title}
                    onChangeText={(title) => { onChange(title, 'title') }}
                />
            </Item>
            <Textarea
                style={styles.container}
                value={newNote.content}
                onChangeText={(title) => { onChange(title, 'content') }}    
                placeholder='New note'              
            />
        </Form>
    </Layout>
    );
}