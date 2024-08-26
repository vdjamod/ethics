from fastapi import FastAPI, HTTPException, status, Depends
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import List, Optional

# FastAPI app initialization
app = FastAPI()
# app.add_middleware(
#     allow_origins=["http://localhost:5173"],  # Replace with your frontend's URL
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# Password hashing context (using bcrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Secret key and Algorithm
SECRET_KEY = "your_secret_key_here"  # Replace with a secure key in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# In-memory storage for users (you should use a database in production)
users_db = {}

# Pydantic User Model (same as your provided model)
class User(BaseModel):
    name: str = ""
    username: str = ""
    email: EmailStr = ""
    password: str = ""
    profile_picture: str = ""
    bio: str = ""
    website: str = ""
    trips: List = []
    following: List = []
    follower: List = []

# Token Data Model
class Token(BaseModel):
    access_token: str
    token_type: str

# Login Model
class UserLogin(BaseModel):
    username: str
    password: str

# User Registration Model (for cleaner input)
class UserRegistration(BaseModel):
    name: str
    username: str
    email: EmailStr
    password: str

# Helper function to hash the password
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Helper function to verify the password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Helper function to create a JWT token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Helper function to authenticate a user
def authenticate_user(username: str, password: str):
    user = users_db.get(username)
    if not user or not verify_password(password, user.password):
        return False
    return user

# Dependency to get current user by verifying the JWT token
def get_current_user(token: str = Depends(lambda: None)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = users_db.get(username)
    if user is None:
        raise credentials_exception
    return user

# Route to register a new user
@app.post("/API/registration", response_model=User)
async def register(user: UserRegistration):
    print(user)
    # if user.username in users_db:
    #     raise HTTPException(
    #         status_code=status.HTTP_400_BAD_REQUEST,
    #         detail="Username already registered",
    #     )
    # hashed_password = hash_password(user.password)
    # print(hash_password)
    new_user = User(
        name=user.name,
        username=user.username,
        email=user.email,
        password=user.password,
    )
    users_db[user.username] = new_user
    return new_user


# Route to login a user and return a JWT token
@app.post("/API/signin", response_model=Token)
async def login(user: UserLogin):
    # authenticated_user = authenticate_user(user.username, user.password)
    # if not authenticated_user:
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Invalid username or password",
    #         headers={"WWW-Authenticate": "Bearer"},
    #     )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )
    print(access_token)
    return {"access_token": access_token, "token_type": "bearer"}

# Route to get the authenticated user's data
@app.get("/users/me", response_model=User)
async def get_current_user_data(current_user: User = Depends(get_current_user)):
    return current_user

