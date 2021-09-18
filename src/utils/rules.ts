import moment, {Moment} from "moment";

export const rules = {
    required: (message: string = "This field is required!") => ({
        required: true,
        message
    }),
    isDateAfter: (message: string) => () => ({
        validator(_: any, value : Moment){
            if (value.isSameOrAfter(moment().add(-1, 'days'))){
                return Promise.resolve();
            }
             return Promise.reject(new Error(message));
        }
    })
}