
const sendResponse = ({res, status, message, data = null, error = null, meta = {}, path, title}) => {
    res.status(status).json({
        success: status < 400,
        status,
        message,
        data,
        error,
        meta,
        path,
        title,
    });
};


/** @type {import("express").RequestHandler} */
exports.get404 = (req, res, next)=>{
    res.setHeader('Content-Type', 'application/json');
    sendResponse(
       {
        res:res,
        status:404,
        message:'Page Not Found!',
        path: req.originalUrl,
        title: 'Not Found'
       }
    );
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */