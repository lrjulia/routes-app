const useFirebaseAuthentication = (firebase) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() =>{
       const unlisten = firebase.auth.onAuthStateChanged(
          authUser => {
            authUser
              ? setAuthUser(authUser)
              : setAuthUser(null);

            const db = firebase.firestore(); // Assuming you've initialized Firebase

            // Reference to the 'drivers' collection
            const driversCollection = db.collection('drivers');

            driversCollection.add({
                name: 'John Doe',
                licenseNumber: '123456789',
                vehicleModel: 'Toyota Camry',
                // Add more fields as per your driver information requirements
              })

          },
       );
       return () => {
           unlisten();
       }
    }, []);

    return authUser
}

export default useFirebaseAuthentication;
