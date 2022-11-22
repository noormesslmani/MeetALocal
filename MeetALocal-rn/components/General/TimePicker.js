import DateTimePicker from '@react-native-community/datetimepicker';
const TimePicker=({time, handleTime})=>{
    return(
        <DateTimePicker
        value={time}
        mode={'time'}
        is24Hour={true}
        onChange={handleTime}
        />
    )
}
export default TimePicker