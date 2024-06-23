import Jwt from 'jsonwebtoken'

const JWT_KEY = '9rXq5bF2nS7yQ8'
const JWT_ADMIN_KEY = '6rXq532nS7yQ8'

export const generateUserToken = async(existingUser ) => {
    try {
        const {_id  } = existingUser;
        const payload = {
            userId: _id,
        }
        const token = Jwt.sign(payload, JWT_KEY, { expiresIn: '3h' });
        // console.log("token created during login:",token)
        return token;
    } catch (error) {
        console.error("Error generating user token:", error);
        throw new Error("Failed to generate user token");
    }
}


export const decodeToken = async (req, res, next) => {
  try {
      const header = req.headers.authorization;
      if (!header) {
          return res.status(401).json({ message: 'Authorization header missing' });
      }

      const token = header.split(" ")[1];
      if (!token) {
          return res.status(401).json({ message: 'Token missing' });
      }

      Jwt.verify(token, JWT_KEY, (err, decodedToken) => {
          if (err) {
              return res.status(401).json({ message: 'Unauthorized Access' });
          }
          req.token = decodedToken;
          next();
      });
  } catch (error) {
      console.error("Error decoding token:", error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};













export const generateAdminToken = async (email ) => {
    try {
        const payload = {
            email: email, 
           
        };
        const token = Jwt.sign(payload, JWT_ADMIN_KEY);
        // console.log('adminToken created during login:', JSON.stringify(token));
        return token;
    } catch (error) {
        console.error("Error generating admin token:", error);
        throw new Error("Failed to generate admin token");
    }
}






export const decodeAdminToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.replace('Bearer ', '');
    // console.log("ADMIN token decoded via middleware:", token);

    Jwt.verify(token, JWT_ADMIN_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }

      req.token = decodedToken;
    
      next();
    });
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

