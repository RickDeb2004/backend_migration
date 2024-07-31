class CodeController {
    static async executeCode(req, res, next) {
        try {
            const { codeDto } = req.body;
            const jwt = req.auth; // or however you're passing authentication information

            const response = await CodeService.executeCode(jwt, codeDto);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CodeController;
