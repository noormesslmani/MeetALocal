import DateTimePicker from '@react-native-community/datetimepicker';
const DatePicker=({date, handleDate, type=1})=>{
    return(
        <>
        {type==1 &&<DateTimePicker
        value={date}
        mode={'date'}
        is24Hour={true}
        onChange={handleDate}
        maximumDate={new Date(2022, 1, 1)}
        minimumDate={new Date(1900, 0, 1)}
        
        />}
        {
            type==2 &&
            <DateTimePicker
            value={date}
            mode={'date'}
            is24Hour={true}
            onChange={handleDate}
            minimumDate={new Date()}
            />
        }
        </>
    )
}
export default DatePicker