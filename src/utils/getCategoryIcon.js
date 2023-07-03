import { Image } from "react-native"

export function getCategoryIcon(index, styles) {
    switch (index) {
        case 1:
            return (<Image source={require('../assets/DefaultIcons/food-and-beverage.png')} style={styles}/>)
        case 2:
            return (<Image source={require('../assets/DefaultIcons/transportation.png')} style={styles}/>)
        case 3:
            return (<Image source={require('../assets/DefaultIcons/rentals.png')} style={styles}/>)
        case 4:
            return (<Image source={require('../assets/DefaultIcons/utility-bills.png')} style={styles}/>)
        case 5:
            return (<Image source={require('../assets/DefaultIcons/medical-expense.png')} style={styles}/>)
        case 6:
            return (<Image source={require('../assets/DefaultIcons/insurance.png')} style={styles}/>)
        case 7:
            return (<Image source={require('../assets/DefaultIcons/education.png')} style={styles}/>)
        case 8:
            return (<Image source={require('../assets/DefaultIcons/pets.png')} style={styles}/>)
        case 9:
            return (<Image source={require('../assets/DefaultIcons/personal-items.png')} style={styles}/>)
        case 10:
            return (<Image source={require('../assets/DefaultIcons/other-expenses.png')} style={styles}/>)
        case 11:
            return (<Image source={require('../assets/DefaultIcons/fitness.png')} style={styles}/>)
        case 12:
            return (<Image source={require('../assets/DefaultIcons/gifts.png')} style={styles}/>)
        case 13:
            return (<Image source={require('../assets/DefaultIcons/entertainment.png')} style={styles}/>)
        case 14:
            return (<Image source={require('../assets/DefaultIcons/hobbies.png')} style={styles}/>)
        case 15:
            return (<Image source={require('../assets/DefaultIcons/fun-money.png')} style={styles}/>)
        case 16:
            return (<Image source={require('../assets/DefaultIcons/salary.png')} style={styles}/>)
        case 17:
            return (<Image source={require('../assets/DefaultIcons/allowance.png')} style={styles}/>)
        case  18:
            return (<Image source={require('../assets/DefaultIcons/other-income.png')} style={styles}/>)
        case  19:
            return (<Image source={require('../assets/DefaultIcons/plus.png')} style={styles}/>)
        default: 
            return (<Image source={require('../assets/DummyIcon.png')} style={styles}/>)
    }
}