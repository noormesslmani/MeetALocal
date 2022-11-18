import Tourism from '../assets/tourism.png'
import Culture from '../assets/cultures.png'
import Education from '../assets/education.png'
import Guidance from '../assets/guidance.png'
import History from '../assets/history.png'
import Housing from '../assets/house.png'
import Language from '../assets/languages.png'
import Other from '../assets/more.png'
import Jobs from '../assets/suitcase.png'
import { Image } from 'react-native'
export const categoryIcons={'Tourism':Tourism, 'Culture':Culture, 'Education':Education, 'Guidance': Guidance,
'History': History, "Housing":Housing, 'Language':Language, 'Other':Other, 'Jobs':Jobs}
export const categoriesOptions=[
    {label: 'All categories', value: 'all'},
    {label: 'Tourism', value: 'Tourism', icon: () => <Image source={Tourism} style={{width:20, height:20}} />},
    {label: 'Language', value: 'Language', icon: () => <Image source={Language} style={{width:20, height:20}}/>},
    {label: 'Culture', value: 'Culture', icon: () => <Image source={Culture} style={{width:20, height:20}}/>},
    {label: 'Education', value: 'Education', icon: () => <Image source={Education} style={{width:20, height:20}}/>},
    {label: 'History', value: 'History', icon: () => <Image source={History} style={{width:20, height:20}}/>},
    {label: 'Guidance', value: 'Guidance', icon: () => <Image source={Guidance} style={{width:20, height:20}}/>},
    {label: 'Jobs', value: 'Jobs', icon: () => <Image source={Jobs} style={{width:20, height:20}}/>},
    {label: 'Housing', value: 'Housing', icon: () => <Image source={Housing} style={{width:20, height:20}}/>},
    {label: 'Other', value: 'Other', icon: () => <Image source={Other} style={{width:20, height:20}}/>},
    ]

export const categoriesSpecificOptions=[
    {label: 'Tourism', value: 'Tourism', icon: () => <Image source={Tourism} style={{width:20, height:20}} />},
    {label: 'Language', value: 'Language', icon: () => <Image source={Language} style={{width:20, height:20}}/>},
    {label: 'Culture', value: 'Culture', icon: () => <Image source={Culture} style={{width:20, height:20}}/>},
    {label: 'Education', value: 'Education', icon: () => <Image source={Education} style={{width:20, height:20}}/>},
    {label: 'History', value: 'History', icon: () => <Image source={History} style={{width:20, height:20}}/>},
    {label: 'Guidance', value: 'Guidance', icon: () => <Image source={Guidance} style={{width:20, height:20}}/>},
    {label: 'Jobs', value: 'Jobs', icon: () => <Image source={Jobs} style={{width:20, height:20}}/>},
    {label: 'Housing', value: 'Housing', icon: () => <Image source={Housing} style={{width:20, height:20}}/>},
    {label: 'Other', value: 'Other', icon: () => <Image source={Other} style={{width:20, height:20}}/>},
    ]