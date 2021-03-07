import React, { useEffect, useState, useContext, useRef } from 'react'
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { Button } from 'native-base';
import { Layout } from '../Components/Layout';
import { NoteContext } from '../Contexts/NoteContext';
import { NoteContent } from '../Components/NoteContent';

export const HomeScreen = props => {
    const prevProps = useRef(false);
    const { getContextNotes } = useContext(NoteContext);
    const [notes, setNotes] = useState([{title:"hi",content:'sup',id:"2"}]);

    useEffect(() => {
        const setData = () => {
            if (prevProps.isFocused !== props.isFocused) {
                const getNotes = getContextNotes();
                //setNotes(getNotes)
            }
        }
        setData();
    }, [getContextNotes, props.isFocused])
    console.log("from home",notes)
    return (
        <Layout title="My Notes" footer={
            <Button full onPress={() => props.navigation.navigate('AddNoteScreen')}>
                <Text>Add Note</Text>
            </Button>
        }>
            {notes ? (
                <FlatList
                    data={notes}
                    keyExtractor={note => note.id}
                    renderItem={note => (
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('ModNote', {
                                    id: note.item.id,
                                })
                            }}>
                            <NoteContent note={{ ...note }} />
                        </TouchableOpacity>
                    )} />) : null}

        </Layout>);
}

export default withNavigationFocus(HomeScreen);