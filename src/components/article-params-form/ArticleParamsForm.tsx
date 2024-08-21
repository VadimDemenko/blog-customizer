import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, useEffect, FormEvent } from 'react';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	setCurrentArticleState: (param: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(currentArticleState);

	const handleChabge = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({ ...selectArticleState, [key]: value });
	};

	const handleReset = () => {
		setSelectArticleState(defaultArticleState);
		setCurrentArticleState(defaultArticleState);
	};

	const toggleSidebar = () => setSidebarOpen((prev) => !prev);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as HTMLElement)
			) {
				setSidebarOpen(false);
			}
		};

		if (sidebarOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [sidebarOpen]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setCurrentArticleState(selectArticleState);
		setSidebarOpen(false);
	};

	return (
		<>
			<ArrowButton onClick={toggleSidebar} isOpen={sidebarOpen} />
			<aside
				ref={sidebarRef}
				className={
					sidebarOpen
						? `${styles.container} ${styles.container_open}`
						: styles.container
				}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.formIndent}>
						<Select
							selected={selectArticleState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) => handleChabge('fontFamilyOption', option)}
							title='Шрифт'
						/>
					</div>
					<div className={styles.formIndent}>
						<RadioGroup
							name='fontSize'
							selected={selectArticleState.fontSizeOption}
							options={fontSizeOptions}
							onChange={(option) => handleChabge('fontSizeOption', option)}
							title='Размер шрифта'
						/>
					</div>
					<div className={styles.formIndent}>
						<Select
							selected={selectArticleState.fontColor}
							options={fontColors}
							onChange={(option) => handleChabge('fontColor', option)}
							title='Цвет шрифта'
						/>
					</div>
					<div className={styles.formIndentWithLine}>
						<Select
							selected={selectArticleState.backgroundColor}
							options={backgroundColors}
							onChange={(option) => handleChabge('backgroundColor', option)}
							title='Цвет фона'
						/>
					</div>
					<div className={styles.formIndent}>
						<Select
							selected={selectArticleState.contentWidth}
							options={contentWidthArr}
							onChange={(option) => handleChabge('contentWidth', option)}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
