const { Op } = require('sequelize');
const { DonationDetails } = require('../models')

class DonationDetailsDAO {


    static async findAll(include) {
        try{
            return await DonationDetails.findAll(buildIncludeOptions(include));
        }catch(error){
            console.error("DonationDetailsDAO error (findAll donationDetails):", error.message)
            throw error;
        }
    }

    static async findById(id, include){
        try{
            const options = buildIncludeOptions(include);
            return await DonationDetails.findByPk(id, options)
        }catch(error){
            console.error('DonationDetailsDAO error(findById): ', error.message);
            throw error;
        }
    }


    static async create(donationDetails, transaction) {
        try {
            if(donationDetails && Array.isArray(donationDetails) && donationDetails.length > 1){
                const newDonationDetails = await DonationDetails.bulkCreate(donationDetails, {transaction});
                return newDonationDetails;
            }
            const newDonationDetails = await DonationDetails.create(donationDetails, {transaction});
            return newDonationDetails;
        } catch (error) {
            console.error('DonationDetailsDAO error (create):', error.message);
            throw error;
        }
    }

    static async deleteById(ids, transaction){
        try{
            const where = Array.isArray(ids) ? {id: {[Op.in]:ids} } : {id: ids};
            const countDeleted = await DonationDetails.destroy({where, transaction});
            return countDeleted > 0;
        }catch(error){
            console.error('DonationDetailsDAO error(deltedById): ', error.message);
            throw error;
        }
    }

    static async update(donationDetails, data, transaction){
        try{
            await donationDetails.update(data, {transaction});
            return donationDetails;
        }catch(error){
            console.error("DAO error(update, donationDetailsDAO): ", error.errors?.map(e=>({
                message: e.message,
                path: e.path,
            })));
            throw error;
        }
    }

}

function buildIncludeOptions(include) {
    const options = {};
    if (include?.length) {
        options.include = [];

        if (include.includes('Donation') || include.includes('Supplier')) {
            const donationInclude = { association: 'Donation', include: [] };

            if (include.includes('Supplier')) {
                donationInclude.include.push({ association: 'Supplier' });
            }

            options.include.push(donationInclude);
        }
    }
    return options;
}


module.exports = DonationDetailsDAO;

