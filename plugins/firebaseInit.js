import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

!firebase.apps.length ?  firebase.initializeApp(firebaseConfig) : ''

export default firebase