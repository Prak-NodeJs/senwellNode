import { Employee } from "../model/emp.model.js"
import ApiError from "../util/errorHandler.js"

export const createEmployee = async(req, res, next)=>{
    try {
        const latestEmployee = await Employee.findOne().sort({ empId: -1 });
        let empId = 1; 
        if (latestEmployee) {
            empId = latestEmployee.empId + 1;
        }
        const {email}=req.body
        const isEmailExist = await Employee.findOne({email})
        if(isEmailExist){
            throw new ApiError(400,'Email Already Exist')
        }
        const empData = await Employee.create({...req.body, empId}) 
        res.status(201).json({
            success:true,
            message:'employee created successfully',
            data:empData
        })
    } catch (error) {
        next(error) 
    }
}

export const getEmployee = async(req, res, next)=>{
    try {
        console.log("hello here")
        const {id}= req.params;
        const data = await findEmployeeById(id)
        if(!data){
            throw new ApiError(404, 'employee not found')
        }
        res.status(201).json({
            success:true,
            message:'employee fetched successfully',
            data
        })
    } catch (error) {
        next(error)
    }
}


export const updateEmployee =async(req, res, next)=>{
    try {
        const {id}= req.params;
        const {name} = req.body
        const data = await findEmployeeById(id)
        if(!data){
            throw new ApiError(404, 'employee not found')
        }
        if(!name){
            throw new ApiError(400,'name is required to update employee name')
        }
        const empUpdatedData = await Employee.findByIdAndUpdate(id, {$set:{name}}, {new:true})
        res.status(201).json({
            success:true,
            message:'employee name updated successfully',
            data:empUpdatedData
        })
    } catch (error) {
         next()
    }
}

export const deleteEmployee = async(req, res, next)=>{
    try {
        const {id} = req.params
        const data = await findEmployeeById(id)
        if(!data){
            throw new ApiError(404, 'employee not found')
        }
        if(!id){
            throw new ApiError(400,'id is required to delete employee')
        }
        await Employee.findOneAndDelete(id)
        res.status(201).json({
            success:true,
            message:'employee deleted successfully',
            data:null
        })
       
    } catch (error) {
        next(error)
        
    }
}


export const searchEmployeeByEmpId= async(req, res, next)=>{
    try {
        console.log("hells gere search")
        const {empId} = req.params
        if(!empId){
            throw new ApiError(400,'empId is required to search')
        }
        const data =await findEmployeeByEmpId(empId)
        console.log(data)
        if(!data){
            throw new ApiError(404, 'employee not found')
        }
        res.status(201).json({
            success:true,
            message:'employee details successfully',
            data
        })
        
    } catch (error) {
        next(error)
    }
}


export const filterEmployeeByDept=async(req, res, next)=>{
    try {
        const {department}= req.query
        if(!department){
            throw new ApiError(400, 'please provide department name')
        }
        const data = await Employee.find({department})
        res.status(201).json({
            success:true,
            message:'employee details retrived successfully',
            data
        })

    } catch (error) {
        next(error)
    }
}


export const sortEmployeeBySalary= async(req, res, next)=>{
    try {
        const sortingOrder = req.query.sort || 'asc';
        const sortOrder = sortingOrder === 'desc' ? -1 : 1;
    
        const data = await Employee.find().sort({salary:sortOrder})
        res.status(201).json({
            success:true,
            message:'employee details retrived successfully',
            data
        })
        
    } catch (error) {
        next(error)
    }
}

const findEmployeeByEmpId = async(empId)=>{
   return await Employee.findOne({empId})
   
}


const findEmployeeById = async(id)=>{
    return await Employee.findById(id)
}
