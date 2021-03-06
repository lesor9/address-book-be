import { promises as fsp } from 'fs';

const fileName = 'users.json';
const filePath = `${__dirname}/${fileName}`; 

type UserType = {
    name: string,
    nativeName: string,
    department: string,
    avatar: string,
    room: string,
    departmentIcon: string,
};

const readData = async (): Promise<UserType[]> => {
    try {
        const content = await fsp.readFile(filePath, 'utf8');
        return JSON.parse(content);
    } catch (e: unknown) {
        if (!(e instanceof Error)) {
            throw e;
        };

        console.warn(`Error ${e.message}`);

        return [];
    }
};

const writeData = async (list: UserType[]): Promise<UserType[]|string|unknown> => {
    try {
        if(!Array.isArray(list)) throw Error('Not array'); 
        await fsp.writeFile(filePath, JSON.stringify(list), 'utf8');
        return list;
    } catch (e: unknown) {
        if (e instanceof Error) return e.message;
        return e;
    }
};

const getList = async (): Promise<UserType[]> => {
    const list: UserType[] = await readData();
    return list;
};

const createUser = async (user: UserType): Promise<UserType> => {
    const list = await readData() || [];

    await writeData([...list, user]);

    return user;
}

export {
    readData,
    writeData,
    getList,
    createUser,
};