import {Cat} from '@/types/Cat';

export type Props = Cat & {
    like: (item: Cat) => void;
    disLike: (item: Cat) => void;
};