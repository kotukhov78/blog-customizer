import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

interface ArticleParamsFormProps {
	formState: ArticleStateType;
	setFormState: (state: ArticleStateType) => void;
	applyFormState: () => void;
	resetFormState: () => void;
}

export const ArticleParamsForm = ({
	formState,
	setFormState,
	applyFormState,
	resetFormState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLElement>(null);

	const togglePanel = () => {
		setIsOpen(!isOpen);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				handleClose();
			}
		};

		window.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleFontFamilyChange = (selected: (typeof fontFamilyOptions)[0]) => {
		setFormState({
			...formState,
			fontFamilyOption: selected,
		});
	};

	const handleFontSizeChange = (selected: (typeof fontSizeOptions)[0]) => {
		setFormState({
			...formState,
			fontSizeOption: selected,
		});
	};

	const handleFontColorChange = (selected: (typeof fontColors)[0]) => {
		setFormState({
			...formState,
			fontColor: selected,
		});
	};

	const handleBackgroundColorChange = (
		selected: (typeof backgroundColors)[0]
	) => {
		setFormState({
			...formState,
			backgroundColor: selected,
		});
	};

	const handleContentWidthChange = (selected: (typeof contentWidthArr)[0]) => {
		setFormState({
			...formState,
			contentWidth: selected,
		});
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		applyFormState();
	};

	const handleReset = (e: FormEvent) => {
		e.preventDefault();
		resetFormState();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={togglePanel} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					{/* Заголовок */}
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					{/* выбор шрифта */}
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleFontFamilyChange}
					/>
					{/* размер шрифта */}
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						name='radio'
						onChange={handleFontSizeChange}
					/>
					{/* цвет шрифта */}
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleFontColorChange}
					/>
					<Separator></Separator>
					{/* цвет фона */}
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleBackgroundColorChange}
					/>
					{/* ширина контента */}
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
