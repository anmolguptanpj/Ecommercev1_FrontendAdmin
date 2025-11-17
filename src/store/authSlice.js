import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api"

export const loginUser = createAsyncThunk(
    "/companylogin",
    async({email,password},{rejectWithValue})=>{
        try {
            const res = await api.post("/companylogin",{
                email,password});
                return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "login failed")
        }
    }
);

export const refreshAccessToken = createAsyncThunk("auth/refresh",
    async(_, {rejectWithValue})=>{
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            const res = await api.post("/companyrefresh",{refreshToken});
            return res.data.accesToken;
            
        } catch (err) {
            return rejectWithValue("Session expired, please login again")
            
        }
    }
);


const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:JSON.parse(localStorage.getItem("user")) || null,
        accessToken:localStorage.getItem("accessToken") || null,
        refreshToken:localStorage.getItem("refreshToken")|| null,
        loading:false,
        error: null,
        isAuthenticated:!!localStorage.getItem("accessToken"),
    },

    reducers:{
        logout:(state)=>{
            state.user= null;
            state.accessToken= null;
            state.refreshToken= null;
            state.isAuthenticated= false;


            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

        },
    },


    extraReducers:(builder)=>{
        //------LOGIN-----//

        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.error= null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user = action.payload.user;
            state.accessToken=action.payload.accesToken;
            state.refreshToken=action.payload.refreshToken;
            state.isAuthenticated= true;

            localStorage.setItem("user",JSON.stringify(action.payload.user));
            localStorage.setItem("accessToken",action.payload.accesToken);
            localStorage.setItem("refreshToken",action.payload.refreshToken);

        })
        .addCase(loginUser.rejected,((state,action)=>{
            state.loading= false;
            state.error=action.payload;
            state.isAuthenticated=false;
        }))

       



        //---------refresh token----------/
        builder
        .addCase(refreshAccessToken.fulfilled,(state,action)=>{
       state.accessToken = action.payload;
       localStorage.setItem("accessToken",action.payload);
        })

        .addCase(refreshAccessToken.rejected,(state)=>{
              state.user = null;
         state.accessToken = null;
         state.isAuthenticated = false   

         localStorage.removeItem("user");
         localStorage.removeItem("accessToken");
         localStorage.removeItem("refreshToken");
        });
    }
});


export const {logout} = authSlice.actions;
export default authSlice.reducer;