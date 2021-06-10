type ClassObj = {
    [key: string]: boolean;
};

type ClassExpr = string | ClassObj;

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

// export function classes(...classPairs: (ClassPair | string)[]) {
//     const classNames = classPairs
//         .map((pair): string => {
//             if (typeof pair === 'string') {
//                 return pair as string;
//             }

//             const [condition, className] = pair as ClassPair;
//             return condition ? className : '';
//         })
//         .filter(Boolean)
//         .join(' ');

//     return classNames;
// }