import { useState } from "react"

export const Vrification = (email : string) => {

    const [otp, setOtp] = useState('');
    
    return <div>
        Verify the otp sent on {email};
        <input type="text" value={otp} placeholder="enter otp" onChange={(e) => {
            setOtp(e.target.value);
        }}></input>
        <button>Verify</button>
    </div>

}