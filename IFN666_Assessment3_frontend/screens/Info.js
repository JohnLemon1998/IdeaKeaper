import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalLayout } from "../components/Layout";
import { GlobalStyles } from "../styles/global";
import { useTheme } from '../context/theme';
import licenseData from '../assets/data/license-info.json';

const Info = () => {
    const route = useRoute();
    const { userId } = route.params;
    const navigation = useNavigation();
    const { isDarkMode } = useTheme();
    const globalstyles = GlobalStyles();

    // Function to handle the back navigation
    const backToNotes = () => {
        navigation.navigate('TopPage', { userId });
    };

    // Determine which image to use based on dark mode
    const imageSource = isDarkMode ? require('../assets/images/idea_keeper_white.png') : require('../assets/images/idea_keeper.png');

    // Group licenses by their type
    const groupedLicenses = Object.keys(licenseData).reduce((acc, key) => {
        const licenseType = licenseData[key].licenses;
        if (!acc[licenseType]) {
            acc[licenseType] = [];
        }
        acc[licenseType].push({ key, index: acc[licenseType].length + 1 });
        return acc;
    }, {});

    return (
        <GlobalLayout>
            <View style={styles.header}>
                <TouchableOpacity onPress={backToNotes}>
                    <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
                </TouchableOpacity>
                <Text style={[styles.headerText, globalstyles.text]}>Information</Text>
                <Text></Text>
            </View>
            <View style={styles.headerBorder}></View>

            <ScrollView style={styles.scrollView}>
                <Image
                    source={imageSource}
                    style={styles.image}
                />
                <Text style={[styles.appDescription, globalstyles.text]}>
                    Idea Keeper is an innovative app designed to help you keep track of your ideas, notes, and inspirations in one convenient place. Whether you're brainstorming new projects, jotting down quick notes, or keeping a journal, Idea Keeper has you covered.
                </Text>

                <View style={styles.Border}></View>

                <Text style={[styles.sectionTitle, globalstyles.text]}>Key Features</Text>
                <View style={styles.feature}>
                    <View style={styles.featureTitleContainer}>
                        <Ionicons name="add-circle" size={24} color={isDarkMode ? "white" : "black"} />
                        <Text style={[styles.featureTitle, globalstyles.text]}>Add Note</Text>
                    </View>
                    <Text style={[styles.featureDescription, globalstyles.text]}>
                        Quickly add new notes with a simple and intuitive interface.
                    </Text>
                </View>
                <View style={styles.feature}>
                    <View style={styles.featureTitleContainer}>
                        <Ionicons name="create" size={24} color={isDarkMode ? "white" : "black"} />
                        <Text style={[styles.featureTitle, globalstyles.text]}>Edit Note</Text>
                    </View>
                    <Text style={[styles.featureDescription, globalstyles.text]}>
                        Edit your existing notes to keep them up-to-date and accurate.
                    </Text>
                </View>
                <View style={styles.feature}>
                    <View style={styles.featureTitleContainer}>
                        <Ionicons name="moon" size={24} color={isDarkMode ? "white" : "black"} />
                        <Text style={[styles.featureTitle, globalstyles.text]}>Dark Mode</Text>
                    </View>
                    <Text style={[styles.featureDescription, globalstyles.text]}>
                        Switch to dark mode to reduce eye strain, especially in low-light environments.
                    </Text>
                </View>

                <View style={styles.Border}></View>

                <Text style={[styles.sectionTitle, globalstyles.text]}>Licenses</Text>
                {Object.keys(groupedLicenses).map((licenseType, licenseIndex) => (
                    <View key={licenseType} style={styles.licenseSection}>
                        <Text style={[styles.licenseTypeTitle, globalstyles.text]}>{licenseType}</Text>
                        {groupedLicenses[licenseType].map((license) => (
                            <View key={license.key} style={styles.licenseContainer}>
                                <Text style={[styles.licenseTitle, globalstyles.text]}>
                                    {license.index}. {license.key}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </GlobalLayout>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 20,
    },
    headerBorder: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
        marginTop: 3,
        paddingHorizontal: 24,
    },
    image: {
        width: '100%',
        height: 250,
    },
    appDescription: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
    },
    Border: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    feature: {
        marginBottom: 16,
    },
    featureTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    featureDescription: {
        fontSize: 16,
    },
    licenseSection: {
        marginBottom: 20,
    },
    licenseTypeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    licenseContainer: {
        marginBottom: 10,
        paddingLeft: 10,
    },
    licenseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Info;
