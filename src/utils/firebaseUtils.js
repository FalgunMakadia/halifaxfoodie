import firebase from '../firebase'

const ref = firebase.firestore().collection('users')
const ref_restaurant = firebase.firestore().collection('restaurants')

export const ifUserAlreadyExists = () => {
  return ref.get().then((i) => {
    const items = i.docs.map((doc) => doc.data())
    if (items) return items
    return null
  })
}

export const addOrUpdateUserToFirestore = (
  Auth,
  answer1,
  answer2,
  userType
) => {
  const user = {
    username: Auth.user.username,
    email: Auth.user.attributes.email,
    phone: Auth.user.attributes.phone_number,
    answer1,
    answer2,
    userType,
  }
  ref
    .doc(Auth.user.username)
    .set(user)
    .then(() => {
      console.log('Firebase User operation success')
    })
    .catch((err) => {
      console.error('Error in addUserToFirestore: ' + err)
    })
}

export const addUserToFirestore = (Auth) => {
  const user = {
    username: Auth.user.username,
    email: Auth.user.attributes.email,
    phone: Auth.user.attributes.phone_number,
    answer1: '',
    answer2: '',
    userType: null,
  }
  ref
    .doc(Auth.user.username)
    .set(user)
    .then(() => {
      console.log('Firebase User operation success')
    })
    .catch((err) => {
      console.error('Error in addUserToFirestore: ' + err)
    })
}

export const updateUserToFirestore = (Auth, answer1, answer2) => {
  ref
    .doc(Auth.user.username)
    .update({ answer1 }, { answer2 })
    .then(() => {
      console.log('Security Answers are updated!')
    })
    .catch(function (error) {
      console.error('Error updating Security Answers: ', error)
    })
}

export const updateRestaurantState = (Auth, resState) => {
  ref_restaurant
    .doc(Auth.user.username.replace('_', ' '))
    .update({ status: resState })
    .then(() => {
      console.log('Restaurant Status updated!')
    })
    .catch(function (error) {
      console.error('Error updating Restaurant Status: ', error)
    })
}

export const ifSecurityAnswersExist = (Auth) => {
  ref
    .doc(Auth.user.username)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data().answer1
      } else {
        console.log('No such document!')
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error)
    })
}
