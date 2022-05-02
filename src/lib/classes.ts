type ClassObj = {
    [key: string]: boolean;
};

export type ClassExpr = string | ClassObj;

export const classes = (...expressions: ClassExpr[]): string => {
    return expressions
        .map(expr => {
            if (typeof expr === 'string') {
                return expr;
            }

            return Object.entries(expr)
                .filter(([_, condition]) => condition)
                .map(([className, _]) => className)
                .join(' ');
        })
        .join(' ');
};
