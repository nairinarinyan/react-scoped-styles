type ClassPair = [boolean, string];

export function classes(...classPairs: (ClassPair | string)[]) {
    const classNames = classPairs
        .map((pair): string => {
            if (typeof pair === 'string') {
                return pair as string;
            }

            const [condition, className] = pair as ClassPair;
            return condition ? className : '';
        })
        .filter(Boolean)
        .join(' ');

    return classNames;
}