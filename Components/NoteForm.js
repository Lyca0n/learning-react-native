import React from 'react';
import { StyleSheet } from 'react-native';
import { Textarea, Form, Item, Input, Label } from 'native-base';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export const NoteForm = ({ note, setNote }) => {    

    const onChange = (value, name) => {
        setNote({
            ...note,
            [name]: value
        })
    }

    return (
        <Form style={styles.container}>
            <Item>
                <Label>Title:</Label>
                <Input
                    value={note.title}
                    onChangeText={(title) => { onChange(title, 'title') }}
                />
            </Item>
            <Textarea
                style={styles.container}
                value={note.content}
                onChangeText={(title) => { onChange(title, 'content') }}
                placeholder='New note'
            />
        </Form>
    )
}