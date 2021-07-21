import firebase from '../firebase'
const ref = firebase.firestore().collection('users')

export const ifUserAlreadyExists = () => {
  return ref.get().then((i) => {
    const items = i.docs.map((doc) => doc.data())
    if (items) return items
    return null
  })
}
